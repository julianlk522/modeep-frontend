import type { ChangeEvent } from 'preact/compat'
import type { Dispatch, StateUpdater } from 'preact/hooks'
import { SortMetrics, type AcceptableSortParams } from '../../types'

interface Props {
	SortBy: AcceptableSortParams
	SetSortBy: Dispatch<StateUpdater<AcceptableSortParams>>
}

export default function SearchSortBy(props: Props) {
	const { SortBy: sort_by, SetSortBy: set_sort_by } = props

	async function handle_set_sort_by(e: ChangeEvent<HTMLSelectElement>) {
		set_sort_by(e.currentTarget.value as AcceptableSortParams)
	}
	return (
		<div>
			<label id='search-sort-by' for='sort-by'>
				Sort By:
			</label>
			<select
				name='sort-by'
				id='sort-by'
				value={sort_by}
				onChange={handle_set_sort_by}
			>
				{SortMetrics.map((met) => (
					<option value={met}>{met}</option>
				))}
			</select>
		</div>
	)
}
