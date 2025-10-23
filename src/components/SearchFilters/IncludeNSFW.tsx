import type { ChangeEvent } from 'preact/compat'
import type { Dispatch, StateUpdater } from 'preact/hooks'

import './IncludeNSFW.css'

interface Props {
	IncludeNSFW: boolean
	SetIncludeNSFW: Dispatch<StateUpdater<boolean>>
	NSFWLinksCount?: number
}

export default function SearchNSFW(props: Props) {
	const { IncludeNSFW: include_nsfw, SetIncludeNSFW: set_include_nsfw, NSFWLinksCount: nsfw_links_count } = props

	return (
		<div id='search-nsfw-container'>
			<label for='nsfw'>
				Include NSFW {nsfw_links_count ? <span id='nsfw-link-count'>{`(${nsfw_links_count})`}</span> : ''}
			</label>
			<input
				type='checkbox'
				id='search-nsfw'
				name='nsfw'
				checked={include_nsfw}
				onChange={(e: ChangeEvent<HTMLInputElement>) => set_include_nsfw((e.target as HTMLInputElement).checked)}
			/>
		</div>
	)
}
