import { effect, useSignal } from '@preact/signals'
import {
	useRef,
	useState,
	type Dispatch,
	type StateUpdater,
} from 'preact/hooks'
import {
	EXPECTED_STAR_REQ_STATUS,
	LINKS_ENDPOINT,
	MAX_EARLIEST_STARRERS_SHOWN,
} from '../../constants'
import {
	is_error_response,
	type StarState,
	type StarStateUpdate,
} from '../../types'
import fetch_with_handle_redirect from '../../util/fetch_with_handle_redirect'
import Star from './Star'
import './Stars.css'
import StarsModal from './StarsModal'

interface Props {
	YourStars: number
	SetYourStars: Dispatch<StateUpdater<number>>
	AvgStars: number
	SetAvgStars: Dispatch<StateUpdater<number>>
	TimesStarred: number
	SetTimesStarred: Dispatch<StateUpdater<number>>
	SetEarliestStarrers: Dispatch<StateUpdater<string>>
	EarliestStarrers: string
	LinkID: string
	LinkText: string
	LinkURL: string
	User?: string
	Token?: string
}

export default function Stars(props: Props) {
	const {
		YourStars: your_stars,
		SetYourStars: set_your_stars,
		AvgStars: avg_stars,
		SetAvgStars: set_avg_stars,
		TimesStarred: times_starred,
		SetTimesStarred: set_times_starred,
		EarliestStarrers: earliest_starrers,
		SetEarliestStarrers: set_earliest_starrers,
		LinkID: link_id,
		LinkText: link_text,
		LinkURL: url,
		User: user,
		Token: token,
	} = props

	const [show_modal, set_show_modal] = useState(false)
	const your_stars_ref = useRef(your_stars)

	const is_static = !user || !token

	const earliest_starrers_split = earliest_starrers.split(', ')
	const num_earliest_starrers = earliest_starrers_split.length
	let earliest_starrers_preview =
		num_earliest_starrers > MAX_EARLIEST_STARRERS_SHOWN
			? earliest_starrers_split
					.slice(0, MAX_EARLIEST_STARRERS_SHOWN)
					.concat(
						`and ${
							num_earliest_starrers - MAX_EARLIEST_STARRERS_SHOWN
						} ${
							num_earliest_starrers ===
							MAX_EARLIEST_STARRERS_SHOWN + 1
								? 'other'
								: 'others'
						}`
					)
					.join(', ')
			: earliest_starrers_split.join(', ')

	const avg_stars_rounded = Math.round(avg_stars)
	const avg_stars_text = `avg. ${avg_stars} ${
		avg_stars === 1 ? 'star' : 'stars'
	}`

	const your_stars_text = `you gave ${your_stars}`
	const only_you_have_starred = times_starred === 1 && your_stars

	const stars_summary_text =
		'(' +
		(your_stars
			? only_you_have_starred
				? your_stars_text + (your_stars === 1 ? ' star' : ' stars')
				: `${avg_stars_text}, ${your_stars_text}`
			: avg_stars_text) +
		')'

	const stars_tooltip_text = `${
		only_you_have_starred
			? 'You are the first to star this!'
			: `Starred by ${earliest_starrers_preview}`
	}\n${stars_summary_text}`

	const avg_stars_ref = useRef(avg_stars)
	const times_starred_ref = useRef(times_starred)
	const earliest_starrers_ref = useRef(earliest_starrers)

	async function update_your_stars_for_link(new_stars: number) {
		const old_stars = your_stars_ref.current
		if (new_stars === old_stars) {
			return
		}

		const star_resp = await fetch_with_handle_redirect(
			LINKS_ENDPOINT + '/star',
			{
				method: !new_stars ? 'DELETE' : 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: new_stars
					? JSON.stringify({ link_id, stars: new_stars })
					: JSON.stringify({ link_id }),
			}
		)

		if (!star_resp.Response || star_resp.RedirectTo) {
			return (window.location.href = star_resp.RedirectTo ?? '/500')
		} else if (star_resp.Response.status !== EXPECTED_STAR_REQ_STATUS) {
			const resp_data = await star_resp.Response.json()
			if (is_error_response(resp_data)) {
				return console.error('Whoops: ', resp_data.error)
			}
			return console.error('Whoops: ', resp_data)
		}

		const old_avg = avg_stars_ref.current
		const old_times_starred = times_starred_ref.current
		const old_earliest_starrers = earliest_starrers_ref.current

		const new_state = calculate_star_state_updates({
			OldStarState: {
				YourStars: old_stars,
				AvgStars: old_avg,
				TimesStarred: old_times_starred,
				EarliestStarrers: old_earliest_starrers,
			},
			NewStars: new_stars,
		})

		set_your_stars(new_stars)
		set_avg_stars(new_state.AvgStars)
		set_times_starred(new_state.TimesStarred)
		set_earliest_starrers(new_state.EarliestStarrers)

		your_stars_ref.current = new_stars
		avg_stars_ref.current = new_state.AvgStars
		times_starred_ref.current = new_state.TimesStarred
		earliest_starrers_ref.current = new_state.EarliestStarrers
	}

	function calculate_star_state_updates(update: StarStateUpdate): StarState {
		const { OldStarState: old_state, NewStars: new_stars } = update
		const {
			YourStars: old_stars,
			AvgStars: old_avg,
			TimesStarred: old_times_starred,
			EarliestStarrers: old_earliest_starrers,
		} = old_state

		const operation =
			new_stars && !old_stars
				? 'add'
				: new_stars && old_stars
				? 'edit'
				: 'delete'

		const times_starred_delta =
			operation === 'add' ? 1 : operation === 'delete' ? -1 : 0
		const new_times_starred = old_times_starred + times_starred_delta
		const new_avg =
			new_times_starred === 0
				? 0
				: parseFloat(
						(
							(old_avg * old_times_starred -
								old_stars +
								new_stars) /
							new_times_starred
						).toFixed(2)
				  )

		let new_earliest_starrers: string
		if (operation === 'add') {
			new_earliest_starrers = 'you, ' + old_earliest_starrers
		} else if (operation === 'delete') {
			new_earliest_starrers = old_earliest_starrers
				.split(', ')
				.filter((starrer) => starrer !== user && starrer !== 'you')
				.join(', ')
		} else {
			new_earliest_starrers = old_earliest_starrers
		}

		return {
			YourStars: new_stars,
			AvgStars: new_avg,
			TimesStarred: new_times_starred,
			EarliestStarrers: new_earliest_starrers,
		}
	}

	// Pass your_stars_updated signal to child StarsModal
	// to allow receiving its value here and responding to updates with requests to
	// API to update stars for this link
	// (avoids passing all props to the modal needed to make the request)
	const your_stars_updated = useSignal<number | undefined>(undefined)

	// Listen for changes and update accordingly
	effect(() => {
		if (
			your_stars_updated.value !== undefined &&
			your_stars_updated.value !== your_stars
		) {
			update_your_stars_for_link(your_stars_updated.value)
			your_stars_updated.value = undefined
		}
	})

	if (is_static) {
		if (!times_starred) {
			return null
		} else {
			return (
				<div class='star-container' title={stars_tooltip_text}>
					{Array.from({ length: avg_stars_rounded }).map((_, i) => (
						<Star key={i} IsStatic />
					))}

					<span class='times-starred'>{times_starred}</span>
				</div>
			)
		}
	}

	return (
		<>
			<div class='star-container'>
				<div class='average-stars' title={stars_tooltip_text}>
					{Array.from({ length: avg_stars_rounded }).map((_, i) => (
						<Star key={i} IsStatic />
					))}
				</div>

				{times_starred ? (
					<span class='times-starred'>{times_starred}</span>
				) : null}

				<button
					class='stars-modal-opener'
					title={your_stars ? 'Edit your rating?' : 'Star this?'}
					onClick={() => set_show_modal(!show_modal)}
				>
					{your_stars > 0 ? (
						Array.from({ length: your_stars }).map((_, i) => (
							<Star IsActive key={i} />
						))
					) : (
						<Star />
					)}
				</button>
			</div>

			{show_modal ? (
				<StarsModal
					InitialStars={your_stars}
					YourStarsUpdatedSignal={your_stars_updated}
					SetShowModal={set_show_modal}
					LinkText={link_text}
					LinkURL={url}
				/>
			) : null}
		</>
	)
}
