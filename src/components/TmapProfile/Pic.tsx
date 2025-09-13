import { useEffect, type Dispatch, type StateUpdater } from 'preact/hooks'
import { ERR_STATUS_RANGE_START, TMAP_PFP_ENDPOINT } from '../../constants'
import './Pic.css'

interface Props {
	FileName?: string
	URL?: string
	SetURL: Dispatch<StateUpdater<string | undefined>>
	LoginName: string
}

export default function Pic(props: Props) {
	const {
		FileName: file_name,
		URL: url,
		SetURL: set_url,
		LoginName: login_name,
	} = props

	useEffect(() => {
		async function get_pfp() {
			if (!file_name) {
				return
			}
			// normal un-wrapped fetch here since pfp is optional
			// no need for redirect
			const pfp_resp = await fetch(TMAP_PFP_ENDPOINT + `/${file_name}`, {
				headers: { 'Content-Type': 'image/*' },
			})
			if (pfp_resp.status >= ERR_STATUS_RANGE_START) {
				return console.error(pfp_resp)
			}
			const pfp_blob = await pfp_resp.blob()
			const pfp_url = URL.createObjectURL(pfp_blob)
			set_url(pfp_url)
		}

		get_pfp()
	}, [file_name])

	return (
		<div id='profile-pic'>
			{url ? (
				<img
					src={url}
					id='pfp'
					alt={`${login_name}'s profile picture`}
					height='125'
				/>
			) : null}
		</div>
	)
}
