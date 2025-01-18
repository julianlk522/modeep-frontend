import { useState } from 'preact/hooks'
import { format_short_date } from '../../util/format_date'
import About from './About'
import Actions from './Actions'
import Email from './Email'
import Pic from './Pic'
import './Profile.css'

interface Props {
	LoginName: string
	SignedInUser?: string
	CreatedAt: string
	InitialPFP?: string
	InitialAboutText: string
	InitialEmailText: string
	Token?: string
}

export default function Profile(props: Props) {
	const {
		LoginName: login_name,
		SignedInUser: signed_in_user,
		CreatedAt: created_at,
		InitialPFP: initial_pfp,
		InitialAboutText: initial_about,
		InitialEmailText: initial_email,
		Token: token,
	} = props
	const [pic_url, set_pic_url] = useState<string | undefined>(undefined)
	const [about_text, set_about_text] = useState<string>(initial_about)
	const [is_editing_about, set_is_editing_about] = useState<boolean>(false)
	const [email_text, set_email_text] = useState<string>(initial_email)
	const [is_editing_email, set_is_editing_email] = useState<boolean>(false)

	const is_signed_in_user = login_name === signed_in_user

	return (
		<section id='profile'>
			<p id='created-at'>
				<span className='profile-details-text'>created</span>:{' '}
				{format_short_date(created_at)}
			</p>
			<div id='profile-sections'>
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
							PicURL={pic_url}
							SetPicURL={set_pic_url}
							AboutText={about_text}
							InitialAbout={initial_about}
							IsEditingAbout={is_editing_about}
							SetIsEditingAbout={set_is_editing_about}
							EmailText={email_text}
							InitialEmail={initial_email}
							IsEditingEmail={is_editing_email}
							SetIsEditingEmail={set_is_editing_email}
							Token={token}
						/>
					) : null}
				</div>
				<About
					Text={about_text}
					SetText={set_about_text}
					Editing={is_editing_about}
				/>
				{is_signed_in_user ? (
					<Email
						Text={email_text}
						SetText={set_email_text}
						Editing={is_editing_email}
					/>
				) : null}
			</div>
		</section>
	)
}
