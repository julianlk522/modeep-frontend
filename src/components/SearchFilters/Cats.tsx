import { effect, useSignal } from '@preact/signals'
import {
	useCallback,
	useEffect,
	useRef,
	useState,
	type Dispatch,
	type StateUpdater,
} from 'preact/hooks'
import { CATS_ENDPOINT, DEBOUNCE_INTERVAL_MS, MAX_CATS_PER_TAG } from '../../constants'
import * as types from '../../types'
import TagCat from '../Tag/TagCat'
import './Cats.css'

interface Props {
	Addable?: boolean
	Removable?: boolean
	IsHomePage?: boolean
	TmapOwner?: string
	IsNewLinkPage?: boolean
	IsTagPage?: boolean
	SelectedCats: string[]
	SetSelectedCats: Dispatch<StateUpdater<string[]>>
	SubmittedLinks?: types.Link[]
}

export default function SearchCats(props: Props) {
	const {
		Removable: removable,
		IsHomePage: is_home_page,
		TmapOwner: tmap_owner,
		IsNewLinkPage: is_new_link_page,
		IsTagPage: is_tag_page,
		SelectedCats: selected_cats,
		SetSelectedCats: set_selected_cats,
		SubmittedLinks: submitted_links,
	} = props

	const addable = props.Addable ?? true
	const input_ref = useRef<HTMLInputElement>(null)

	const has_max_num_cats = selected_cats.length >= MAX_CATS_PER_TAG

	const [recommended_cats, set_recommended_cats] = useState<types.CatCount[] | undefined>(undefined)
	const [snippet, set_snippet] = useState<string>('')
	const [error, set_error] = useState<string | undefined>(undefined)

	const non_selected_recommendations = recommended_cats?.filter((rc) => !selected_cats.includes(rc.Category))

	const fetch_snippet_recommendations = useCallback(async () => {
		const encoded_snippet = encodeURIComponent(snippet)
		let spellfix_matches_url = CATS_ENDPOINT + `/${encoded_snippet}`
		if (tmap_owner) {
			spellfix_matches_url += `?from_tmap=${tmap_owner}`
		}
		if (selected_cats.length) {
			const encoded_selected_cats = selected_cats
				.map((cat) => {
					return encodeURIComponent(cat)
				})
				.join(',')
			if (tmap_owner) {
				spellfix_matches_url += `&omitted=${encoded_selected_cats}`
			} else {
				spellfix_matches_url += `?omitted=${encoded_selected_cats}`
			}
		}

		try {
			const spellfix_matches_resp = await fetch(spellfix_matches_url)
			if (!spellfix_matches_resp.ok) {
				const msg: types.ErrorResponse = await spellfix_matches_resp.json()
				set_error(msg.error)
				throw new Error('API request failed')
			}

			const spellfix_matches: types.CatCount[] = await spellfix_matches_resp.json()
			set_recommended_cats(spellfix_matches)
		} catch (error) {
			set_recommended_cats(undefined)
			set_error(error instanceof Error ? error.message : String(error))
		}
	}, [snippet, selected_cats])

	// prev_selected_cats_ref prevents re-searching for recommended cats
	// when user deletes 1+
	const prev_selected_cats_ref = useRef(selected_cats)

	// fetch new recommendations in response to snippet changes or added cats
	const MIN_SNIPPET_CHARS = 2
	const timeout_ref = useRef<number | null>(null)
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

	// Let children TagCat.tsx handle adding / removing cats
	const added_cat = useSignal<string | undefined>(undefined)
	const deleted_cat = useSignal<string | undefined>(undefined)

	effect(() => {
		if (added_cat.value?.length) {
			const to_add = added_cat.value
			set_selected_cats((prev) => {
				const next = [...prev, to_add].sort((a, b) => a.localeCompare(b))
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

	function reset_timeout_and_fetch_new_recommendations() {
		if (timeout_ref.current) {
			window.clearTimeout(timeout_ref.current)
		}
		timeout_ref.current = window.setTimeout(() => {
			fetch_snippet_recommendations()
		}, DEBOUNCE_INTERVAL_MS)
	}

	function handle_enter(event: KeyboardEvent) {
		if (event.key === 'Enter' && snippet) {
			event.stopPropagation()
			return add_cat(event)
		}
	}

	function add_cat(event: Event) {
		event.preventDefault()

		if (has_max_num_cats) {
			set_error('Max number of cats reached :(')
			return
		}

		let new_cat = snippet
		if (snippet === 'nsfw') {
			new_cat = 'NSFW'
		}

		if (selected_cats.includes(new_cat)) {
			set_error('You already have that, doofus')
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

	useEffect(() => {
		if (submitted_links?.length) {
			set_snippet('')
		}
		set_recommended_cats(undefined)
	}, [submitted_links])

	// autofocus on tag page when you start editing your tag
	// (autoFocus attribute below cannot be trusted since the
	// <input /> is rendered conditionally)
	useEffect(() => {
		if (!is_tag_page) return
		input_ref.current?.focus()
	}, [is_tag_page])

	const placeholder_text = 'Start typing for cat suggestions'

	return (
		<>
			{addable ? (
				<div id="search-cats-container" class={is_home_page ? 'home' : ''}>
					{!is_home_page ? (
						<label id="search-cats" for="cats">
							Cats:
						</label>
					) : null}

					<input
						id="cats"
						ref={input_ref}
						name="cats"
						type="text"
						value={snippet}
						autocomplete={'off'}
						placeholder={selected_cats?.length ? '' : placeholder_text}
						onInput={(event) => {
							prev_selected_cats_ref.current = selected_cats
							set_snippet((event.target as HTMLInputElement).value)
							set_error(undefined)
						}}
						onKeyDown={handle_enter}
					/>

					{!is_home_page ? (
						<input
							id="add-cat-filter"
							title={has_max_num_cats ? 'Max number of cats reached' : 'Add cat filter'}
							type="button"
							value="+"
							onClick={add_cat}
							onKeyDown={handle_enter}
							disabled={!snippet || has_max_num_cats}
						/>
					) : null}

					{error ? <p class="error">{error}</p> : null}
				</div>
			) : null}

			{non_selected_recommendations?.length ? (
				<ol id="recommendations-list">
					{non_selected_recommendations.map((cat) => (
						<TagCat
							key={cat}
							Cat={is_home_page ? `${cat.Category} (${cat.Count})` : cat.Category}
							Count={is_home_page ? undefined : cat.Count}
							Addable={!is_home_page}
							AddedSignal={added_cat}
							Href={is_home_page ? `/search?cats=${cat.Category}` : undefined}
							IsNewLinkPage={is_new_link_page}
						/>
					))}
				</ol>
			) : null}

			{!is_home_page ? (
				<div id="selected-cats-container">
					{selected_cats.length ? (
						<ul id="cat-list">
							{selected_cats.map((cat) => (
								<TagCat
									key={cat}
									Cat={cat}
									Removable={removable ?? true}
									DeletedSignal={deleted_cat}
									Fat
								/>
							))}

							{removable && selected_cats.length > 1 ? (
								<li>
									<input
										id="clear-cat-filters"
										title="Clear cat filters"
										type="button"
										value="Clear"
										onClick={() => {
											set_selected_cats([])
										}}
									/>
								</li>
							) : null}
						</ul>
					) : null}
				</div>
			) : null}
		</>
	)
}
