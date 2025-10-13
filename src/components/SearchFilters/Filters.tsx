import { useCallback, useRef, useState } from 'preact/hooks'
import type { Period, SortMetric, tmap_sections } from '../../types'
import SearchCats from './Cats'
import './Filters.css'
import SearchNSFW from './NSFW'
import SearchPeriod from './Period'
import SearchSortBy from './SortBy'
import SearchSummaryContains from './SummaryContains'
import SearchURLContains from './URLContains'
import SearchURLLacks from './URLLacks'

interface Props {
	Endpoint?: '/search' | '/more' | '/map'
	TmapOwnerLoginName?: string
	SingleTmapSectionName?: (typeof tmap_sections)[number]
	NSFWLinksCount?: number
	InitialCats: string[]
	InitialSummaryContains: string
	InitialURLContains: string
	InitialURLLacks: string
	InitialPeriod: Period
	// not used on More Cats page
	InitialSortBy?: SortMetric
	InitialNSFW?: boolean
}

export default function SearchFilters(props: Props) {
	const {
		Endpoint: endpoint,
		TmapOwnerLoginName: tmap_owner_login_name,
		SingleTmapSectionName: single_tmap_section_name,
		NSFWLinksCount: nsfw_links_count,
		InitialCats: initial_cats,
		InitialSummaryContains: initial_summary_contains,
		InitialURLContains: initial_url_contains,
		InitialURLLacks: initial_url_lacks,
		InitialPeriod: initial_period,
		InitialSortBy: initial_sort_by,
		InitialNSFW: initial_nsfw,
	} = props

	const is_tmap = endpoint === '/map'

	const [cats, set_cats] = useState<string[]>(initial_cats)
	const [summary_contains, set_summary_contains] =
		useState<string>(initial_summary_contains)
	const [url_contains, set_url_contains] =
		useState<string>(initial_url_contains)
	const [url_lacks, set_url_lacks] = useState<string>(initial_url_lacks)
	const [period, set_period] = useState<Period>(initial_period)
	const [sort_by, set_sort_by] = useState<SortMetric>(initial_sort_by ?? 'times_starred')
	const [nsfw, set_nsfw] = useState<boolean>(initial_nsfw ?? false)

	// Params
	const params = new URLSearchParams()

	const has_cats = cats.length > 0
	if (has_cats) {
		params.set('cats', cats.join(','))
	}
	const has_summary_contains = summary_contains?.length
	if (has_summary_contains) {
		params.set('summary_contains', summary_contains)
	}
	const has_url_contains = url_contains?.length
	if (has_url_contains) {
		params.set('url_contains', url_contains)
	}
	const has_url_lacks = url_lacks?.length
	if (has_url_lacks) {
		params.set('url_lacks', url_lacks)
	}
	const has_period = period !== 'all'
	if (has_period) {
		params.set('period', period)
	}
	if (sort_by && sort_by !== 'times_starred') {
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
		summary_contains !== initial_summary_contains ||
		url_contains !== initial_url_contains ||
		url_lacks !== initial_url_lacks ||
		period !== initial_period ||
		sort_by !== initial_sort_by ||
		nsfw !== initial_nsfw

	let base_url = endpoint
		? is_tmap
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
			if (e.key === 'Enter' && has_changed_filters) {
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
				<h2>Filters</h2>
			</div>
			<form onKeyDown={handle_keydown}>
				<SearchCats
					SelectedCats={cats}
					SetSelectedCats={set_cats}
					TmapOwner={tmap_owner_login_name}
				/>

				{is_tmap && cats.length ? (
					<p id='transfer-to-global-map'>
						<a href={
							single_tmap_section_name
								? search_url.replace(
									`/map/${tmap_owner_login_name}/${single_tmap_section_name?.toLowerCase()}`,
									'/search'
								)
								: search_url.replace(
									`/map/${tmap_owner_login_name}`,
									'/search'
								)
						}>
							Transfer cats to Global Treasure Map
						</a>
					</p>
				) : null}

				<SearchSummaryContains
					SummaryContains={summary_contains}
					SetSummaryContains={set_summary_contains}
					TmapOwner={tmap_owner_login_name}
				/>

				<SearchURLContains
					URLContains={url_contains}
					SetURLContains={set_url_contains}
				/>

				<SearchURLLacks
					URLLacks={url_lacks}
					SetURLLacks={set_url_lacks}
				/>

				<SearchPeriod Period={period} SetPeriod={set_period} />

				{endpoint !== '/more' ? (
					<>
						<SearchSortBy

						<SearchNSFW NSFW={nsfw} SetNSFW={set_nsfw} NSFWLinksCount={nsfw_links_count} />
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
					{is_tmap
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
