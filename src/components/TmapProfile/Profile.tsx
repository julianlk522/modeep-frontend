import { useState } from 'preact/hooks'
import About from './About'
import Actions from './Actions'
import Pic from './Pic'
import './Profile.css'

interface Props {
	LoginName: string
	SignedInUser?: string
	InitialAboutText: string
	InitialPFP?: string
	Token?: string
}

export default function Profile(props: Props) {
	const {
		LoginName: login_name,
		SignedInUser: signed_in_user,
		InitialAboutText: initial_about,
		InitialPFP: initial_pfp,
		Token: token,
	} = props
	const [pic_url, set_pic_url] = useState<string | undefined>(undefined)
	const [about_text, set_about_text] = useState<string>(initial_about)
	const [is_editing_about, set_is_editing_about] = useState<boolean>(false)

	const is_signed_in_user = login_name === signed_in_user

	return (
		<section id='profile'>
			<div>
				{initial_pfp ? (
					<Pic
						FileName={initial_pfp}
						LoginName={login_name}
						URL={pic_url}
						SetURL={set_pic_url}
					/>
				) : undefined}
				{is_signed_in_user ? (
					<Actions
						AboutText={about_text}
						InitialAbout={initial_about}
						IsEditingAbout={is_editing_about}
						SetIsEditingAbout={set_is_editing_about}
						PicURL={pic_url}
						SetPicURL={set_pic_url}
						Token={token}
					/>
				) : null}
			</div>
			<About
				Text={about_text}
				SetText={set_about_text}
				Editing={is_editing_about}
			/>
		</section>
	)
}
