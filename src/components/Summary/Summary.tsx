import { useState } from 'preact/hooks'
import {
	EXPECTED_SUMMARY_DELETE_REQ_STATUS,
	EXPECTED_SUMMARY_LIKE_REQ_STATUS,
	MAX_EARLIEST_LIKERS_SHOWN,
	SUMMARIES_ENDPOINT,
} from '../../constants'
import { is_error_response } from '../../types'
import fetch_with_handle_redirect from '../../util/fetch_with_handle_redirect'
import { format_long_date } from '../../util/format_date'
import { save_action_and_path_then_redirect_to_login } from '../../util/login_redirect'
import StaticLikeCount from '../Link/StaticLikeCount'
import './Summary.css'

interface Props {
	ID: string
	Text: string
	SubmittedBy: string
	LastUpdated: string
	LikeCount: number
	EarliestLikers: string
	IsLiked?: boolean
	Token?: string
	User?: string
}

export default function Summary(props: Props) {
	const {
		ID,
		Token: token,
		User: user,
		Text: text,
		SubmittedBy: submitted_by,
		LastUpdated: last_updated,
	} = props

	const [is_liked, set_is_liked] = useState(props.IsLiked)
	const [like_count, set_like_count] = useState(props.LikeCount)
	const [earliest_likers, set_earliest_likers] = useState(
		props.EarliestLikers
	)
	const [error, set_error] = useState<string | undefined>(undefined)

	const is_your_summary = submitted_by === user

	async function handle_like() {
		if (!token) {
			save_action_and_path_then_redirect_to_login({
				Action: 'like summary',
				SummaryID: ID,
			})
		}

		const resp = await fetch_with_handle_redirect(
			SUMMARIES_ENDPOINT + `/${ID}/like`,
			{
				method: is_liked ? 'DELETE' : 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		)
		if (!resp.Response || resp.RedirectTo) {
			return (window.location.href = resp.RedirectTo ?? '/500')
		} else if (resp.Response.status !== EXPECTED_SUMMARY_LIKE_REQ_STATUS) {
			const data = await resp.Response.json()
			if (is_error_response(data)) {
				return set_error(data.error)
			}
			return console.error('Whoops: ', data)
		}

		if (is_liked) {
			set_is_liked(false)
			set_like_count((prev) => prev - 1)
			set_earliest_likers((prev) =>
				prev
					.split(', ')
					.filter((liker: string) => liker !== user)
					.join(', ')
			)
		} else {
			set_is_liked(true)
			set_like_count((prev) => prev + 1)

			if (like_count < MAX_EARLIEST_LIKERS_SHOWN) {
				set_earliest_likers((prev) => prev + `, ${user}`)
			}
		}
		return
	}

	async function handle_delete() {
		if (!token) {
			return (window.location.href = '/login')
		}
		const delete_resp = await fetch_with_handle_redirect(
			SUMMARIES_ENDPOINT,
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ summary_id: ID }),
			}
		)
		if (!delete_resp.Response || delete_resp.RedirectTo) {
			return (window.location.href = delete_resp.RedirectTo ?? '/500')
		} else if (
			delete_resp.Response.status !== EXPECTED_SUMMARY_DELETE_REQ_STATUS
		) {
			const delete_data = await delete_resp.Response.json()
			if (is_error_response(delete_data)) {
				return set_error(delete_data.error)
			}
			return console.error('Whoops: ', delete_data)
		}

		const textarea = document.getElementById(
			'summary'
		) as HTMLTextAreaElement
		if (textarea) {
			textarea.value = ''
		}
		return window.location.reload()
	}

	function copy_summary_to_textarea() {
		const textarea = document.getElementById(
			'summary'
		) as HTMLTextAreaElement
		if (textarea) {
			textarea.value = text
		}
	}

	return (
		<li class='summary'>
			<strong>"{text}"</strong>
			<p>
				<span class='by'>by </span>
				{submitted_by === 'Auto Summary' ? (
					<span class='auto-summary'>Auto Summary</span>
				) : (
					<a class='submitted-by' href={`/map/${submitted_by}`}>
						{is_your_summary ? 'you' : submitted_by}
					</a>
				)}
			</p>
			<p class='last-updated'>{format_long_date(last_updated)}</p>
			{user !== submitted_by ? (
				<button
					title={`${is_liked ? 'Unlike' : 'Like'} - (${like_count} ${
						like_count === 1 ? 'like' : 'likes'
					}${like_count > 0 ? `: ${earliest_likers}` : ''})`}
					onClick={handle_like}
					class={`like-btn${is_liked ? ' liked' : ''}`}
				>
					{is_liked ? 'Unlike' : 'Like'} ({like_count})
				</button>
			) : (
				<>
					<StaticLikeCount
						LikeCount={like_count}
						EarliestLikers={earliest_likers}
					/>
					<button
						title='Delete summary'
						id='delete-summary-btn'
						class='img-btn'
						onClick={handle_delete}
					>
						<img src='../../../delete.svg' height={20} width={20} />
					</button>
					<button
						id='edit-summary-btn'
						title='Edit summary'
						class='img-btn'
						onClick={copy_summary_to_textarea}
					>
						<img
							src='../../../edit.svg'
							height={20}
							width={20}
							alt='Edit summary'
						/>
					</button>
					{error ? <p class='error'>{error}</p> : null}
				</>
			)}
		</li>
	)
}
