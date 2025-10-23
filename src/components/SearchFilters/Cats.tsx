import { effect, useSignal } from '@preact/signals'
import { useCallback, useEffect, useMemo, useRef, useState, type Dispatch, type StateUpdater } from 'preact/hooks'
import { CATS_ENDPOINT, DEBOUNCE_INTERVAL_MS, CATS_PER_TAG_LIMIT, CATS_CHAR_LIMIT } from '../../constants'
import * as types from '../../types'
import TagCat from '../Tag/TagCat'
import './Cats.css'

interface Props {
	Addable?: boolean
	Removable?: boolean
	IsHomePage?: boolean
	TmapOwner?: string
	IsTagPage?: boolean
	SelectedCats: string[]
	SetSelectedCats: Dispatch<StateUpdater<string[]>>

	// Searches only (/search, /more, or user Treasure Maps)
	SelectedNeuteredCats?: string[]
	SetSelectedNeuteredCats?: Dispatch<StateUpdater<string[]>>

	// /new only
	IsNewLinkPage?: boolean
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
		SelectedNeuteredCats: selected_neutered_cats = [],
		SetSelectedNeuteredCats: set_selected_neutered_cats,
		SubmittedLinks: submitted_links,
	} = props

	const addable = props.Addable ?? true
	const input_ref = useRef<HTMLInputElement>(null)
	const combined_selections = useMemo(() => 
		[...selected_cats, ...(selected_neutered_cats || [])],
		[selected_cats, selected_neutered_cats]
	)
	const has_max_num_cats = selected_cats.length >= CATS_PER_TAG_LIMIT ||
		(selected_neutered_cats?.length || 0) >= CATS_PER_TAG_LIMIT

	const [recommended_cats, set_recommended_cats] = useState<types.CatCount[] | undefined>(undefined)
	const [snippet, set_snippet] = useState<string>('')
	const [error, set_error] = useState<string | undefined>(undefined)
	const non_selected_recommendations = recommended_cats?.filter((rc) => !combined_selections.includes(rc.Category))

	const fetch_snippet_recommendations = useCallback(async () => {
		if (!snippet) return

		const encoded_snippet = encodeURIComponent(snippet)
		const snippet_params = new URLSearchParams()
		if (tmap_owner) {
			snippet_params.set('tmap', tmap_owner)
		}
		if (is_new_link_page) {
			snippet_params.set('is_new_link_page', 'true')
		}
		if (selected_cats.length) {
			const encoded_selected_cats = selected_cats
				.map((cat) => encodeURIComponent(cat))
				.join(',')
			snippet_params.set('cats', encoded_selected_cats)
		}
		if (selected_neutered_cats && selected_neutered_cats.length) {
			const encoded_selected_neutered_cats = selected_neutered_cats
				.map((cat) => encodeURIComponent(cat))
				.join(',')
			snippet_params.set('neutered', encoded_selected_neutered_cats)
		}

		const spellfix_matches_url = CATS_ENDPOINT + `/${encoded_snippet}` + `?${snippet_params.toString()}`
		try {
			const spellfix_matches_resp = await fetch(spellfix_matches_url)
			if (!spellfix_matches_resp.ok) {
				const msg: types.ErrorResponse = await spellfix_matches_resp.json()
				set_error(msg.error)
				throw new Error(msg.error)
			}
			const spellfix_matches: types.CatCount[] = await spellfix_matches_resp.json()
			set_recommended_cats(spellfix_matches)
		} catch (error) {
			set_recommended_cats(undefined)
			set_error(error instanceof Error ? error.message : String(error))
		}
	}, [snippet, selected_cats, selected_neutered_cats])

	const prev_combined_selections_ref = useRef(combined_selections)
	const timeout_ref = useRef<number | null>(null)
	const MIN_SNIPPET_CHARS = 2
	useEffect(() => {
		const prev_length = prev_combined_selections_ref.current.length
		const curr_length = combined_selections.length

		// Skip if user deleted selected cat(s)
		if (prev_length > curr_length) {
			prev_combined_selections_ref.current = combined_selections
			return
		}

		// Skip if snippet is too short
		if (snippet?.length < MIN_SNIPPET_CHARS) {
			set_recommended_cats(undefined)
		} else {
			reset_timeout_and_fetch_new_recommendations()
		}

		// Update ref
		prev_combined_selections_ref.current = combined_selections

		return () => {
			if (timeout_ref.current) {
				window.clearTimeout(timeout_ref.current)
			}
		}
	}, [snippet, combined_selections.length])

	function reset_timeout_and_fetch_new_recommendations() {
		if (timeout_ref.current) {
			window.clearTimeout(timeout_ref.current)
		}
		timeout_ref.current = window.setTimeout(() => {
			fetch_snippet_recommendations()
		}, DEBOUNCE_INTERVAL_MS)
	}

	const added_cat = useSignal<string | undefined>(undefined)
	const neutered_cat = useSignal<string | undefined>(undefined)
	const deleted_cat = useSignal<string | undefined>(undefined)
	effect(() => {
		if (added_cat.value?.length) {
			verify_and_add_cat(added_cat.value)
			added_cat.value = undefined
		} else if (neutered_cat.value?.length) {
			verify_and_add_neutered_cat(neutered_cat.value)
			neutered_cat.value = undefined
		} else if (deleted_cat.value) {
			set_selected_cats((c) => c.filter((cat) => cat !== deleted_cat.value))
			if (set_selected_neutered_cats) {
				set_selected_neutered_cats((c) => c.filter((cat) => cat !== deleted_cat.value))
			}
			set_error(undefined)
			deleted_cat.value = undefined
		}
	})

	function verify_and_add_cat(cat: string) {
		if (has_max_num_cats) {
			set_error('Max number of cats reached :(')
			return
		} else if (cat.length > CATS_CHAR_LIMIT) {
			set_error('Cat is too long :(')
			return
		}
		cat = cat.trim()
		if (cat === 'nsfw') {
			cat = 'NSFW'
		}
		if (selected_cats.includes(cat)) {
			set_error('You have that already, doofus')
			return
		}
		set_selected_cats((prev) => {
			const next = [...prev, cat].sort((a, b) => a.localeCompare(b))
			prev_combined_selections_ref.current = [...next, ...(selected_neutered_cats || [])]
			return next
		})
		set_error(undefined)
	}

	function verify_and_add_neutered_cat(cat: string) {
		if (!set_selected_neutered_cats) return
		if (has_max_num_cats) {
			set_error('Max number of cats reached :(')
			return
		} else if (cat.length > CATS_CHAR_LIMIT) {
			set_error('Cat is too long :(')
			return
		}
		cat = cat.trim()
		if (cat === 'nsfw') {
			cat = 'NSFW'
		}
		if (selected_neutered_cats && selected_neutered_cats.includes(cat)) {
			set_error('Already neutered :)')
			return
		}
		set_selected_neutered_cats((prev) => {
			const next = [...prev, cat].sort((a, b) => a.localeCompare(b))
			prev_combined_selections_ref.current = [...selected_cats, ...next]
			return next
		})
		set_error(undefined)
	}

	function handle_enter(event: KeyboardEvent) {
		if (event.key === 'Enter' && snippet.length) {
			event.preventDefault()
			event.stopPropagation()
			return verify_and_add_cat(snippet)
		}
	}

	useEffect(() => {
		if (submitted_links?.length) {
			set_snippet('')
		}
		set_recommended_cats(undefined)
	}, [submitted_links])

	useEffect(() => {
		if (!is_tag_page) return
		input_ref.current?.focus()
	}, [is_tag_page])

	const placeholder_text = 'Start typing for cat suggestions'

	return (
		<>
			{addable ? (
				<div id='search-cats-container' class={is_home_page ? 'home' : ''}>
					{!is_home_page ? <label for='cats'>Cats:</label> : null}

					<input
						id='search-cats'
						ref={input_ref}
						name='cats'
						type='text'
						value={snippet}
						autocomplete={'off'}
						placeholder={selected_cats?.length ? '' : placeholder_text}
						onInput={(event) => {
							prev_combined_selections_ref.current = selected_cats
							set_snippet((event.target as HTMLInputElement).value)
							set_error(undefined)
						}}
						onKeyDown={handle_enter}
					/>

					{!is_home_page ? (
						<input
							id='add-cat-filter'
							title={has_max_num_cats ? 'Max number of cats reached' : 'Add cat filter'}
							type='button'
							value='+'
							onClick={() => verify_and_add_cat(snippet)}
							onKeyDown={handle_enter}
							disabled={!snippet || has_max_num_cats}
						/>
					) : null}

					{error ? <p class='error'>{error}</p> : null}
				</div>
			) : null}

			{non_selected_recommendations?.length ? (
				<ol id='recommendations-list'>
					{non_selected_recommendations.map((cat) => (
						<TagCat
							key={cat.Category}
							Cat={is_home_page ? `${cat.Category} (${cat.Count})` : cat.Category}
							Count={is_home_page ? undefined : cat.Count}
							Addable={!is_home_page}
							AddedSignal={added_cat}
							Neuterable={props.SelectedNeuteredCats !== undefined}
							NeuteredSignal={neutered_cat}
							Href={is_home_page ? `/search?cats=${cat.Category}` : undefined}
							IsNewLinkPage={is_new_link_page}
						/>
					))}
				</ol>
			) : null}

			{!is_home_page ? (
				combined_selections.length ? (
					<div id='selected-cats-container'>
						<ul id='cat-list'>
							{selected_cats.map((cat) => (
								<TagCat
									key={cat}
									Cat={cat}
									IsNSFW={cat === 'NSFW'}
									Removable={removable ?? true}
									DeletedSignal={deleted_cat}
									Fat
								/>
							))}
							{selected_neutered_cats
								? selected_neutered_cats.map((cat) => (
										<TagCat
											key={cat}
											Cat={cat}
											Neutered
											Removable={removable ?? true}
											DeletedSignal={deleted_cat}
											Fat
										/>
									))
								: null}
							{removable && combined_selections.length > 1 ? (
								<li>
									<input
										id='clear-cat-filters'
										title='Clear cat filters'
										type='button'
										value='Clear'
										onClick={() => {
											set_selected_cats([])
											set_selected_neutered_cats?.([])
										}}
									/>
								</li>
							) : null}
						</ul>
					</div>
				) : null
			) : null}
		</>
	)
}
