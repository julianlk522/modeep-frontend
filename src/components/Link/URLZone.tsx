import { CLICKS_ENDPOINT } from '../../constants'
import './URLZone.css'

interface Props {
	Link_ID: string
	URL: string
	Summary?: string
	SummaryCount: number
	IsSummaryPage?: boolean
}

export default function URLZone({
	Link_ID: link_id,
	URL: url,
	Summary: summary,
	SummaryCount: summary_count,
	IsSummaryPage: is_summary_page,
}: Props) {
	const link_text = summary ? summary : url

	async function handle_click(e: MouseEvent) {
		e.preventDefault()

		await fetch(CLICKS_ENDPOINT, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ link_id }),
		})

		if (e.button === 0) {
			return (window.location.href = url)
		}
	}

	return (
		<div>
			<a
				class='url-anchor'
				href={url}
				onClick={(e) => {
					e.preventDefault()
					handle_click(e)
				}}
				onMouseDown={(e) => {
					// don't double-count left click
					if (e.button === 0) return
					e.preventDefault()
					handle_click(e)
				}}
			>
				<h3>
					{link_text}
					{is_summary_page || summary_count === 0 ? null : (
						<a
							title={`View this link's summaries (${summary_count} total)`}
							href={`/summary/${link_id}`}
							class='summaries-page-link'
						>
							{` (`}
							<span class='summary-count'>{summary_count}</span>
							{`)`}
						</a>
					)}
				</h3>
			</a>
			{summary ? <p class='url'>{url}</p> : null}
		</div>
	)
}
