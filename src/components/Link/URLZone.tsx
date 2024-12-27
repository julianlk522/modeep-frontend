import { CLICKS_ENDPOINT } from '../../constants'
import './URLZone.css'

interface Props {
	link_id: string
	url: string
	summary?: string
}

export default function URLZone({ link_id, url, summary }: Props) {
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
				<h3>{summary ? summary : url}</h3>
			</a>
			{summary ? <p class='url'>{url}</p> : null}
		</div>
	)
}
