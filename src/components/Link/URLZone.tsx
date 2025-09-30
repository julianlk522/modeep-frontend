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

	// Any links saved in the database should have a protocol
	// but just in case they don't, this will ensure they go to the proper URL
	// and not, e.g., "https://modeep.org/google.com"
	const has_protocol = url.startsWith('http://') || url.startsWith('https://')
	const url_with_protocol = has_protocol ? url : `https://${url}`

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
			window.open(url, '_blank')
		}
	}

	return (
		<div>
			<h3 class='link-title'>
				<a
					href={url_with_protocol}
					title={summary ? summary : undefined}
					class='url-link'
					onClick={(e) => {
						e.preventDefault()
						handle_click(e)
					}}
					// this is needed to handle middle clicks
					onMouseDown={(e) => {
						// don't double-count left click
						if (e.button === 0) return
						e.preventDefault()
						handle_click(e)
					}}
				>
					{link_text}
				</a>

				{!is_summary_page ? (
					<>
						{` (`}
						<a
							title={`View this link's summaries (${summary_count}) or add/edit yours`}
							href={`/summary/${link_id}`}
							class='summaries-page-link'
						>
							<span class='summary-count'>{summary_count}</span>
						</a>
						{`)`}
					</>
				) : null}
			</h3>
			{summary ? <p class='url'>{url}</p> : null}
		</div>
	)
}
