import { effect, useSignal } from '@preact/signals'
import {
	useCallback,
	useEffect,
	useRef,
	useState,
	type Dispatch,
	type StateUpdater,
} from 'preact/hooks'
import { CATS_ENDPOINT, MAX_CATS_PER_TAG } from '../../constants'
import * as types from '../../types'
import { type CatCount } from '../../types'
import TagCat from '../Tag/TagCat'
import './Cats.css'

interface Props {
	Addable?: boolean
	Removable?: boolean
	IsNewLinkPage?: boolean
	IsTagPage?: boolean
	SelectedCats: string[]
	SubmittedLinks?: types.Link[]
	SetSelectedCats: Dispatch<StateUpdater<string[]>>
}

export default function SearchCats(props: Props) {
	const {
		Removable: removable,
		IsNewLinkPage: is_new_link_page,
		IsTagPage: is_tag_page,
		SelectedCats: selected_cats,
		SetSelectedCats: set_selected_cats,
	} = props
	const addable = props.Addable ?? true

	const has_max_num_cats = selected_cats.length >= MAX_CATS_PER_TAG

	const [error, set_error] = useState<string | undefined>(undefined)

	const [snippet, set_snippet] = useState<string>('')
	const [recommended_cats, set_recommended_cats] = useState<
		CatCount[] | undefined
	>(undefined)

	// only render recommendations-list if there are non-selected recommendations
	const non_selected_recommendations = recommended_cats?.filter(
		(rc) => !selected_cats.includes(rc.Category)
	)

	const fetch_snippet_recommendations = useCallback(async () => {
		// encode reserved chars
		const encoded_snippet = encodeURIComponent(snippet)
		let spellfix_matches_url = CATS_ENDPOINT + `/${encoded_snippet}`
		if (selected_cats.length) {
			const encoded_selected_cats = selected_cats
				.map((cat) => {
					return encodeURIComponent(cat)
				})
				.join(',')
			spellfix_matches_url += `?omitted=${encoded_selected_cats}`
		}

		try {
			const spellfix_matches_resp = await fetch(spellfix_matches_url)
			if (!spellfix_matches_resp.ok) {
				const msg: types.ErrorResponse =
					await spellfix_matches_resp.json()
				set_error(msg.error)
				throw new Error('API request failed')
			}

			const spellfix_matches: CatCount[] =
				await spellfix_matches_resp.json()
			set_recommended_cats(spellfix_matches)
			set_error(undefined)
		} catch (error) {
			set_recommended_cats([])
			set_error(error instanceof Error ? error.message : String(error))
		}
	}, [snippet, selected_cats])

	// prev_selected_cats_ref prevents re-searching for recommended cats
	// when user deletes 1+
	// gets updated after adding cats or changing snippet, but not after deleting
	// (so deletion can be identified and ignored)
	const prev_selected_cats_ref = useRef(selected_cats)

	// timeout_ref keeps track of pending debounced recommendation fetches
	const timeout_ref = useRef<number | null>(null)

	// fetch new recommendations in response to snippet changes or added cats
	const MIN_SNIPPET_CHARS = 2
	useEffect(() => {
		// skip if snippet is too short or user deleted selected cat(s)
		if (prev_selected_cats_ref.current.length > selected_cats.length) {
			return
		}
		if (snippet?.length >= MIN_SNIPPET_CHARS) {
			reset_timeout_and_fetch_new_recommendations()
		} else {
			set_recommended_cats(undefined)
		}

		// cleanup: clear any ongoing debounce timeout
		return () => {
			if (timeout_ref.current) {
				window.clearTimeout(timeout_ref.current)
			}
		}
	}, [snippet, selected_cats])

	// Pass added_cat / deleted_cat signals to children TagCat.tsx
	// to allow adding recommended cats / removing selected cats here
	const added_cat = useSignal<string | undefined>(undefined)
	const deleted_cat = useSignal<string | undefined>(undefined)

	// Listen for add / delete cat signals from TagCat
	effect(() => {
		if (added_cat.value?.length) {
			const new_cat = added_cat.value
			set_selected_cats((prev) => {
				const next = [...prev, new_cat].sort((a, b) =>
					a.localeCompare(b)
				)
				prev_selected_cats_ref.current = next
				return next
			})

			added_cat.value = undefined
			set_error(undefined)

			reset_timeout_and_fetch_new_recommendations()
		} else if (deleted_cat.value) {
			const to_delete = deleted_cat.value
			set_selected_cats((c) => c.filter((cat) => cat !== to_delete))

			deleted_cat.value = undefined
			set_error(undefined)
		}
	})

	useEffect(() => {
		if (props.SubmittedLinks && props.SubmittedLinks.length) {
			set_snippet('')
		}
	}, [props.SubmittedLinks])

	// debounced fetch timeout
	const DEBOUNCE_INTERVAL = 500
	function reset_timeout_and_fetch_new_recommendations() {
		if (timeout_ref.current) {
			window.clearTimeout(timeout_ref.current)
		}
		timeout_ref.current = window.setTimeout(() => {
			fetch_snippet_recommendations()
		}, DEBOUNCE_INTERVAL)
	}

	function handle_enter(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			add_cat(event)
		}
	}

	function add_cat(event: Event) {
		event.preventDefault()
		if (!snippet) {
			set_error('Input is empty')
			return
		}

		if (has_max_num_cats) {
			set_error('Maxiumum number of cats reached')
			return
		}

		let new_cat = snippet
		// correct 'nsfw' to 'NSFW'
		if (snippet === 'nsfw') {
			new_cat = 'NSFW'
		}

		if (selected_cats.includes(new_cat)) {
			set_error('Already added')
			return
		}

		set_selected_cats((prev) => {
			const next = [...prev, new_cat].sort((a, b) => a.localeCompare(b))
			prev_selected_cats_ref.current = next
			return next
		})

		set_snippet('')
		set_error(undefined)

		reset_timeout_and_fetch_new_recommendations()
	}

	return (
		<div id='search-cats-container'>
			{addable ? (
				<>
					<label id='search-cats' for='cats'>
						Cats:
					</label>
					<input
						type='text'
						name='cats'
						id='cats'
						onInput={(event) => {
							// update selected cats ref so does not remain
							// unsynced after deleting any from selected_cats,
							// preventing new recommendations
							prev_selected_cats_ref.current = selected_cats
							set_snippet(
								(event.target as HTMLInputElement).value
							)
						}}
						onKeyPress={handle_enter}
						value={snippet}
						autocomplete={'off'}
						autoFocus={!is_new_link_page}
					/>

					<input
						id='add-cat-filter'
						title={
							has_max_num_cats
								? 'Maxiumum number of cats reached'
								: 'Add cat filter'
						}
						type='submit'
						value='+'
						onClick={add_cat}
						disabled={!snippet || has_max_num_cats}
					/>
				</>
			) : null}

			{non_selected_recommendations?.length ? (
				<ol id='recommendations-list'>
					{non_selected_recommendations.map((cat) => (
						<TagCat
							key={cat}
							Cat={cat.Category}
							Count={cat.Count}
							Addable={true}
							AddedSignal={added_cat}
						/>
					))}
				</ol>
			) : null}

			{selected_cats.length ? (
				<ul id='cat-list'>
					{selected_cats.map((cat) => (
						<TagCat
							key={cat}
							Cat={cat}
							Removable={removable ?? true}
							DeletedSignal={deleted_cat}
						/>
					))}
					{!is_tag_page && selected_cats.length > 1 ? (
						<li>
							<input
								id='clear-cat-filters'
								title='Clear cat filters'
								type='submit'
								value='Clear'
								onClick={() => {
									set_selected_cats([])
								}}
							/>
						</li>
					) : null}
				</ul>
			) : null}

			{error ? <p class='error'>{error}</p> : null}
		</div>
	)
}
