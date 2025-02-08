import { useState } from 'preact/hooks'
import type { Period, SortMetric } from '../../types'
import SearchCats from './Cats'
import './Filters.css'
import SearchNSFW from './NSFW'
import SearchPeriod from './Period'
import SearchSortBy from './SortBy'
import SearchURLContains from './URLContains'

interface Props {
	Endpoint?: '/search' | '/more'
	InitialCats: string[]
	InitialURLContains: string
	InitialPeriod: Period
	InitialSortBy?: SortMetric
	InitialNSFW?: boolean
}

export default function SearchFilters(props: Props) {
	const {
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

	// only for links (/search)
	const [sort_by, set_sort_by] = useState<SortMetric>(
		initial_sort_by ?? 'rating'
	)
	const [nsfw, set_nsfw] = useState<boolean>(initial_nsfw ?? false)

	// set search URL based on period and cats
	let endpoint = props.Endpoint ?? '/search'
	const base_URL = endpoint ?? '/search'
	let search_URL = base_URL

	const has_cats = cats.length > 0
	if (has_cats) {
		// encode reserved chars
		const encoded_cats = cats
			.map((cat) => encodeURIComponent(cat))
			.join(',')
		search_URL += `?cats=${encoded_cats}`
	}

	const has_url_contains = url_contains?.length
	if (has_url_contains) {
		if (has_cats) {
			search_URL += `&url_contains=${url_contains}`
		} else {
			search_URL += `?url_contains=${url_contains}`
		}
	}

	const has_period = period !== 'all'
	if (has_period) {
		if (has_cats || has_url_contains) {
			search_URL += `&period=${period}`
		} else {
			search_URL += `?period=${period}`
		}
	}

	// /search page endpoint only
	const sort_by_newest = sort_by && sort_by !== 'rating'
	if (sort_by_newest) {
		if (has_cats || has_url_contains || has_period) {
			search_URL += `&sort_by=${sort_by}`
		} else {
			search_URL += `?sort_by=${sort_by}`
		}
	}
	if (nsfw) {
		if (has_cats || has_period || has_url_contains || sort_by_newest) {
			search_URL += `&nsfw=true`
		} else {
			search_URL += `?nsfw=true`
		}
	}

	const has_changed_cats =
		cats.length !== initial_cats.length ||
		cats.some((cat) => !initial_cats.includes(cat))
	const has_changed_filters =
		endpoint === '/more'
			? has_changed_cats || has_url_contains || has_period
			: has_changed_cats ||
				has_url_contains ||
				has_period ||
				sort_by_newest ||
				nsfw !== initial_nsfw

	return (
		<section id='search-filters'>
			<form>
				<h2>Filters</h2>

				<SearchCats SelectedCats={cats} SetSelectedCats={set_cats} />

				<SearchURLContains
					URLContains={url_contains}
					SetURLContains={set_url_contains}
				/>

				<SearchPeriod Period={period} SetPeriod={set_period} />

				{endpoint === '/search' ? (
					<>
						<SearchSortBy
							SortBy={sort_by}
							SetSortBy={set_sort_by}
						/>
						<SearchNSFW NSFW={nsfw} SetNSFW={set_nsfw} />
					</>
				) : null}

				<a
					id='search-from-filters'
					title={
						has_changed_filters
							? ''
							: 'Filters unchanged: scroll down to see returned links'
					}
					class={has_changed_filters ? 'filters-changed' : ''}
					href={search_URL}
				>
					Scour The Treasure Map
				</a>
			</form>
		</section>
	)
}
