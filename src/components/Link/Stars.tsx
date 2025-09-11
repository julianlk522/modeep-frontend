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
	Stars: number
	SetStars: Dispatch<StateUpdater<number>>
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
		Stars: stars,
		SetStars: set_stars,
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
	const stars_ref = useRef(stars)

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

	if (stars) {
		earliest_starrers_preview += `\n (you gave ${stars} star${stars > 1 ? 's' : ''})`
	}

	const EXPECTED_STAR_REQ_STATUS = 204
	const MAX_EARLIEST_STARRERS_SHOWN = 10

	async function update_your_stars_for_link(new_stars: number) {
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

		const old_stars = stars_ref.current
		if (new_stars !== old_stars) {
			if (!new_stars) {
				set_times_starred((prev) => prev - 1)
				set_earliest_starrers((prev) =>
					prev
						.split(', ')
						.filter((starrer: string) => starrer !== user)
						.join(', ')
				)
			} else if (!old_stars) {
				set_times_starred((prev) => prev + 1)

				if (times_starred < MAX_EARLIEST_STARRERS_SHOWN) {
					set_earliest_starrers((prev) => prev + `, you`)
				}
			}
		}

		stars_ref.current = new_stars
		set_stars(new_stars)
	}

	// Pass stars_set signal to child StarsModal
	// to allow receiving its value here and responding to updates with requests to
	// API to update stars for this link
	// (avoids passing all props to the modal needed to make the request)
	const stars_set = useSignal<number | undefined>(undefined)

	// Listen for changes and update accordingly
	effect(() => {
		if (stars_set.value !== undefined && stars_set.value !== stars) {
			update_your_stars_for_link(stars_set.value)
			stars_set.value = undefined
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
					<Star IsStatic />

					<span class='times-starred'>{times_starred}</span>
				</div>
			)
		}
	}

	return (
		<>
			<div
				class='star-container'
				title={
					times_starred
						? `Starred by ${earliest_starrers_preview}`
						: 'Give a star?'
				}
			>
				<button
					class='stars-modal-opener'
					onClick={() => set_show_modal(!show_modal)}
				>
					{stars > 0 ? (
						Array.from({ length: stars }).map((_, i) => (
							<Star IsActive key={i} />
						))
					) : (
						<Star />
					)}
				</button>

				{times_starred ? (
					<span class='times-starred'>{times_starred}</span>
				) : null}
			</div>

			{show_modal ? (
				<StarsModal
					InitialStars={stars}
					StarsSetSignal={stars_set}
					SetShowModal={set_show_modal}
					LinkText={link_text}
					LinkURL={url}
				/>
			) : null}
		</>
	)
}
