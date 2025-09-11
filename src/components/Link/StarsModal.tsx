import type { Signal } from '@preact/signals'
import {
	useMemo,
	useState,
	type Dispatch,
	type StateUpdater,
} from 'preact/hooks'
import Star from './Star'
import './StarsModal.css'

interface Props {
	InitialStars: number
	StarsSetSignal: Signal<number | undefined>
	SetShowModal: Dispatch<StateUpdater<boolean>>
	LinkText: string
	LinkURL: string
}

export default function StarsModal(props: Props) {
	const {
		InitialStars: initial_stars,
		StarsSetSignal: stars_set_signal,
		SetShowModal: set_show_modal,
		LinkText: text,
		LinkURL: url,
	} = props

	const [pending_stars, set_pending_stars] = useState(initial_stars)

	const star_descriptive_text_html = useMemo(() => {
		return [
			<>
				<p class={pending_stars === 1 ? 'emphatic' : ''}>Thanks! </p>
				<p>This is cool to see and know about.</p>
			</>,
			<>
				<p>
					This is{' '}
					<span class={pending_stars === 2 ? 'emphatic' : ''}>
						Epic!
					</span>
				</p>
				<p>What treasure I have uncovered...</p>
			</>,
			<>
				<p>
					This is{' '}
					<span class={pending_stars === 3 ? 'emphatic' : ''}>
						unbelievably epic!!
					</span>
				</p>
				<p>
					What a testament to human ingenuity and the grandeur of our
					world!
				</p>
			</>,
		]
	}, [pending_stars])

	async function handle_submit() {
		if (!stars_set_signal) return
		stars_set_signal.value = pending_stars
		set_show_modal(false)
	}

	return (
		<div id='stars-modal-bg' onClick={() => set_show_modal(false)}>
			<div id='stars-modal-content' onClick={(e) => e.stopPropagation()}>
				<h3 id='link-title'>{text}</h3>
				<p>({url})</p>

				<div id='star-selectors'>
					{Array.from({ length: 3 }).map((_, i) => (
						<div
							class='star-selector'
							onClick={() => {
								if (pending_stars === i + 1) {
									set_pending_stars(0)
								} else {
									set_pending_stars(i + 1)
								}
							}}
						>
							<div
								title={
									i
										? `${i + 1}-star this link?`
										: 'Star this link?'
								}
							>
								{Array.from({ length: i + 1 }).map(() => (
									<Star IsActive={pending_stars === i + 1} />
								))}
							</div>

							{star_descriptive_text_html[i]}
						</div>
					))}
				</div>

				<button id='ok' onClick={handle_submit}>
					OK
				</button>
			</div>
		</div>
	)
}
