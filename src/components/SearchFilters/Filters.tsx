import { useCallback, useRef, useState } from 'preact/hooks'
import type { Period, SortMetric, tmap_sections } from '../../types'
import SearchCats from './Cats'
import './Filters.css'
import SearchNSFW from './NSFW'
import SearchPeriod from './Period'
import SearchSortBy from './SortBy'
import SearchURLContains from './URLContains'

interface Props {
	Endpoint?: '/search' | '/more' | '/map'
	TmapOwnerLoginName?: string
	SingleTmapSectionName?: (typeof tmap_sections)[number]
	NSFWLinks?: number
	InitialCats: string[]
	InitialURLContains: string
	InitialPeriod: Period
	InitialSortBy?: SortMetric
	InitialNSFW?: boolean
}

export default function SearchFilters(props: Props) {
	const {
		Endpoint: endpoint,
		TmapOwnerLoginName: tmap_owner_login_name,
		SingleTmapSectionName: single_tmap_section_name,
		NSFWLinks: nsfw_links,
		InitialCats: initial_cats,
		InitialURLContains: initial_url_contains,
		InitialPeriod: initial_period,
		InitialSortBy: initial_sort_by,
		InitialNSFW: initial_nsfw,
	} = props

	const [cats, set_cats] = useState<string[]>(initial_cats)
	const [url_contains, set_url_contains] =
		useState<string>(initial_url_contains)
	const [period, set_period] = useState<Period>(initial_period)
	const [sort_by, set_sort_by] = useState<SortMetric>(
		initial_sort_by ?? 'rating'
	)
	const [nsfw, set_nsfw] = useState<boolean>(initial_nsfw ?? false)

	// Params
	const params = new URLSearchParams()

	const has_cats = cats.length > 0
	if (has_cats) {
		params.set('cats', cats.join(','))
	}

	const has_url_contains = url_contains?.length
	if (has_url_contains) {
		params.set('url_contains', url_contains)
	}

	const has_period = period !== 'all'
	if (has_period) {
		params.set('period', period)
	}

	// /search page endpoint only
	const sort_by_newest = sort_by && sort_by !== 'rating'
	if (sort_by_newest) {
		params.set('sort_by', sort_by)
	}

	if (nsfw) {
		params.set('nsfw', 'true')
	}

	const has_changed_cats =
		cats.length !== initial_cats.length ||
		cats.some((cat) => !initial_cats.includes(cat))

	const has_changed_filters =
		has_changed_cats ||
		url_contains !== initial_url_contains ||
		period !== initial_period ||
		sort_by !== initial_sort_by ||
		nsfw !== initial_nsfw

	let base_url = endpoint
		? endpoint === '/map'
			? single_tmap_section_name
				? `/map/${tmap_owner_login_name}/${single_tmap_section_name.toLowerCase()}`
				: `/map/${tmap_owner_login_name}`
			: endpoint
		: '/search'
	const search_url = params.toString()
		? `${base_url}?${params.toString()}`
		: base_url

	// search by pressing "Enter"
	// (propagation stopped within SearchCats if "Enter" is used to add a cat)
	const scour_anchor_ref = useRef<HTMLAnchorElement>(null)

	const handle_keydown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key !== 'Enter') return

			if (has_changed_filters) {
				scour_anchor_ref.current?.click()
			}
		},
		[has_changed_filters]
	)

	function toggle_search_filters_collapsed() {
		document.documentElement.classList.toggle('search-filters-collapsed')

		const is_collaped = document.documentElement.classList.contains(
			'search-filters-collapsed'
		)
			? 'true'
			: 'false'
		localStorage.setItem('collapse_search_filters_initially', is_collaped)
	}

	return (
		<section id='search-filters'>
			<div
				id='search-filters-header'
				onClick={toggle_search_filters_collapsed}
			>
				<img
					id='filters-expansion-arrow'
					src='../../back.svg'
					alt='Filters are expanded'
					height={20}
					width={20}
				/>
				<h3>Filters</h3>
			</div>
			<form onKeyDown={handle_keydown}>
				<SearchCats SelectedCats={cats} SetSelectedCats={set_cats} />

				{cats.length && endpoint === '/map' ? (
					<p id='transfer-to-global-map'>
						<a
							href={
								single_tmap_section_name
									? search_url.replace(
											`/map/${tmap_owner_login_name}/${single_tmap_section_name?.toLowerCase()}`,
											'/search'
										)
									: search_url.replace(
											`/map/${tmap_owner_login_name}`,
											'/search'
										)
							}
						>
							Transfer cats to Global Treasure Map
						</a>
					</p>
				) : null}

				<SearchURLContains
					URLContains={url_contains}
					SetURLContains={set_url_contains}
				/>

				<SearchPeriod Period={period} SetPeriod={set_period} />

				{endpoint !== '/more' ? (
					<>
						<SearchSortBy
							SortBy={sort_by}
							SetSortBy={set_sort_by}
						/>

						<SearchNSFW
							NSFW={nsfw}
							SetNSFW={set_nsfw}
							NSFWLinks={nsfw_links}
						/>
					</>
				) : null}

				<a
					id='search-from-filters'
					title={
						has_changed_filters
							? ''
							: 'Filters unchanged; scroll down to see returned links'
					}
					class={has_changed_filters ? 'filters-changed' : ''}
					href={search_url}
					ref={scour_anchor_ref}
				>
					Scour
					{base_url.startsWith('/map/' + tmap_owner_login_name)
						? ' this '
						: ' the '}
					Treasure Map
					{single_tmap_section_name ? ' section' : ''}
				</a>
			</form>
			<div
				id='lower-expansion-toggle-clickable-zone'
				onClick={toggle_search_filters_collapsed}
			></div>
		</section>
	)
}
