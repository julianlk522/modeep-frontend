import type { Dispatch, StateUpdater } from 'preact/hooks'

interface Props {
	URLContains: string
	SetURLContains: Dispatch<StateUpdater<string>>
}

export default function SearchURLContains(props: Props) {
	const { URLContains: url_contains, SetURLContains: set_url_contains } = props

	return (
		<div id='search-url-contains-container'>
			<label for='url-contains-snippet'>URL Contains:</label>
			<input
				id='url-contains-snippet'
				type='text'
				value={url_contains}
				onInput={(e: InputEvent) => {
					set_url_contains((e.target as HTMLInputElement).value)
				}}
			/>
		</div>
	)
}
