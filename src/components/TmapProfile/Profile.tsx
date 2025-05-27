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
	InitialPFPFileName?: string
	InitialAboutText: string
	InitialEmailText: string
	Token?: string
}

export default function Profile(props: Props) {
	const {
		LoginName: login_name,
		SignedInUser: signed_in_user,
		CreatedAt: created_at,
		InitialPFPFileName: initial_pfp_filename,
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
				<span>Created:</span>
				<strong>{format_short_date(created_at)}</strong>
			</p>

			<div id='profile-sections'>
				{initial_pfp_filename || is_signed_in_user ? (
					<div>
						{initial_pfp_filename ? (
							<Pic
								FileName={initial_pfp_filename}
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
				) : null}

				{about_text?.length ? (
					<About
						Text={about_text}
						SetText={set_about_text}
						Editing={is_editing_about}
					/>
				) : null}

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
