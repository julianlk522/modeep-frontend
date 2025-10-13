import type { Dispatch, StateUpdater } from 'preact/hooks'

interface Props {
	URLLacks: string
	SetURLLacks: Dispatch<StateUpdater<string>>
}

export default function SearchURLLacks(props: Props) {
	const { URLLacks: url_lacks, SetURLLacks: set_url_lacks } = props

	return (
		<div id='search-url-lacks-container'>
			<label for='url-lacks-snippet'>URL Lacks:</label>
			<input
				id='search-url-lacks'
				name='url-lacks-snippet'
				type='text'
				value={url_lacks}
				onInput={(e: InputEvent) => {
					set_url_lacks((e.target as HTMLInputElement).value)
				}}
			/>
		</div>
	)
}
