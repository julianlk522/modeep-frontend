import type { Dispatch, StateUpdater } from 'preact/hooks'

interface Props {
	SummaryContains: string
	SetSummaryContains: Dispatch<StateUpdater<string>>
}

export default function SearchSummmaryContains(props: Props) {
	const { SummaryContains: summary_contains, SetSummaryContains: set_summary_contains } = props

	return (
		<div id='search-summary-contains-container'>
			<label for='summary-snippet'>Summary Contains:</label>
			<input
				id='summary-snippet'
				type='text'
				value={summary_contains}
				onInput={(e: InputEvent) => {
					set_summary_contains((e.target as HTMLInputElement).value)
				}}
			/>
		</div>
	)
}
