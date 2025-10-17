import type { ChangeEvent } from 'preact/compat'
import type { Dispatch, StateUpdater } from 'preact/hooks'
import './Email.css'

interface Props {
	Text: string
	SetText: Dispatch<StateUpdater<string>>
	Editing: boolean
}

export default function Email(props: Props) {
	const { Text: text, SetText: set_text, Editing: editing } = props

	return (
		<div id='profile-email'>
			{editing ? (
				<input
					type='email'
					name='email'
					onChange={(e: ChangeEvent<HTMLInputElement>) => set_text(e.currentTarget.value)}
					value={text}
				/>
			) : text ? (
				<>
					<span>Email: </span>
					<strong>{text}</strong>
				</>
			) : (
				<span>No email set.</span>
			)}
			<p id='profile-email-note' class='profile-details-text'>
				Only you can see your email. It is recommended to set one in case you forget your password and need to
				send a recovery link.
			</p>
		</div>
	)
}
