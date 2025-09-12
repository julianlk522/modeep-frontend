import { effect, useSignal } from '@preact/signals'
import {
	useRef,
	useState,
	type Dispatch,
	type StateUpdater,
} from 'preact/hooks'
import { LINKS_ENDPOINT } from '../../constants'
import { is_error_response } from '../../types'
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
	LinkSubmittedBy: string
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
		LinkSubmittedBy: link_submitted_by,
		LinkText: link_text,
		LinkURL: url,
		User: user,
		Token: token,
	} = props

	const [show_modal, set_show_modal] = useState(false)
	const your_stars_ref = useRef(your_stars)

	const is_static = !user || !token || link_submitted_by === user
	const earliest_starrers_split = earliest_starrers.split(', ')
	const num_earliest_starrers = earliest_starrers_split.length
	let earliest_starrers_preview =
		num_earliest_starrers > 3
			? earliest_starrers_split
					.slice(0, 3)
					.concat(`and ${num_earliest_starrers - 3} others`)
					.join(', ')
			: earliest_starrers_split.join(', ')

	const avg_stars_rounded_up = Math.ceil(avg_stars)
	earliest_starrers_preview += ` (avg. ${avg_stars} ${
		avg_stars === 1 ? 'star' : 'stars'
	})`

	const EXPECTED_STAR_REQ_STATUS = 204
	const MAX_EARLIEST_STARRERS_SHOWN = 10

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
					? JSON.stringify({
							link_id,
							stars: new_stars,
					  })
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

		if (!new_stars) {
			// un-star
			set_avg_stars((prev) => {
				const new_avg =
					(prev * times_starred - old_stars) / (times_starred - 1)
				return parseFloat(new_avg.toFixed(2))
			})

			set_earliest_starrers((prev) =>
				prev
					.split(', ')
					.filter((starrer: string) => starrer !== user)
					.join(', ')
			)

			set_times_starred((prev) => prev - 1)
		} else if (!old_stars) {
			// new star
			set_avg_stars((prev) => {
				const new_avg =
					(prev * times_starred + new_stars) / (times_starred + 1)
				return parseFloat(new_avg.toFixed(2))
			})

			if (!times_starred) {
				set_earliest_starrers(
					(prev) =>
						prev +
						`you\n(you gave ${new_stars} ${
							new_stars === 1 ? 'star' : 'stars'
						})`
				)
			} else if (times_starred < MAX_EARLIEST_STARRERS_SHOWN) {
				set_earliest_starrers(
					(prev) =>
						prev +
						`, you (you gave ${new_stars} ${
							new_stars === 1 ? 'star' : 'stars'
						})`
				)
			}

			set_times_starred((prev) => prev + 1)
		} else {
			// edit number of stars you have assigned
			set_avg_stars((prev) => {
				const new_avg =
					(prev * times_starred - old_stars + new_stars) /
					times_starred
				return parseFloat(new_avg.toFixed(2))
			})
		}

		your_stars_ref.current = new_stars
		set_your_stars(new_stars)
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
				<div
					class='star-container'
					title={`Starred by ${earliest_starrers_preview}`}
				>
					{Array.from({ length: avg_stars_rounded_up }).map(
						(_, i) => (
							<Star key={i} IsStatic />
						)
					)}

					<span class='times-starred'>{times_starred}</span>
				</div>
			)
		}
	}

	return (
		<>
			<div class='star-container'>
				<div
					class='average-stars'
					title={
						times_starred === 1 && your_stars
							? `You are the first to star this!\n(you gave ${your_stars} ${
									your_stars === 1 ? 'star' : 'stars'
							  })`
							: `Starred by ${earliest_starrers_preview}`
					}
				>
					{Array.from({ length: avg_stars_rounded_up }).map(
						(_, i) => (
							<Star key={i} IsStatic />
						)
					)}
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
