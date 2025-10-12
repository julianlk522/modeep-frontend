import type { ChangeEvent } from 'preact/compat'
import type { Dispatch, StateUpdater } from 'preact/hooks'

import './NSFW.css'

interface Props {
	NSFW: boolean
	SetNSFW: Dispatch<StateUpdater<boolean>>
	NSFWLinksCount?: number
}

export default function SearchNSFW(props: Props) {
	const { NSFW: nsfw, SetNSFW: set_nsfw, NSFWLinksCount: nsfw_links_count } = props

	return (
		<div id='search-nsfw-container'>
			<label id='search-nsfw' for='nsfw'>
				Include NSFW {nsfw_links_count ? <span id='nsfw-link-count'>{`(${nsfw_links_count})`}</span> : ''}
			</label>
			<input
				type='checkbox'
				id='nsfw'
				name='nsfw'
				checked={nsfw}
				onChange={(e: ChangeEvent<HTMLInputElement>) => set_nsfw((e.target as HTMLInputElement).checked)}
			/>
		</div>
	)
}
