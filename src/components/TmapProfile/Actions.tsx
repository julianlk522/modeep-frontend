import { useState, type Dispatch, type StateUpdater } from 'preact/hooks'
import { TMAP_ABOUT_ENDPOINT, TMAP_PFP_ENDPOINT } from '../../constants'
import { is_error_response } from '../../types'
import fetch_with_handle_redirect from '../../util/fetch_with_handle_redirect'
import Modal from '../Modal/Modal'
import './Actions.css'

interface Props {
	AboutText: string
	InitialAbout: string
	IsEditingAbout: boolean
	SetIsEditingAbout: Dispatch<StateUpdater<boolean>>
	PicURL?: string
	SetPicURL: Dispatch<StateUpdater<string | undefined>>
	Token?: string
}

export default function Actions(props: Props) {
	const {
		AboutText: about_text,
		InitialAbout: initial_about,
		IsEditingAbout: is_editing_about,
		SetIsEditingAbout: set_is_editing_about,
		PicURL: pic_url,
		SetPicURL: set_pic_url,
		Token: token,
	} = props

	const [error, set_error] = useState<string | undefined>(undefined)
	const [show_delete_pic_modal, set_show_delete_pic_modal] =
		useState<boolean>(false)

	function handle_finished_updating_about(event: Event) {
		event.preventDefault()

		if (about_text === initial_about || (!about_text && !initial_about)) {
			set_is_editing_about(false)
			set_error(undefined)
			return
		}

		update_about()
	}

	async function update_about() {
		if (!token) {
			return (window.location.href = '/login')
		}

		const edit_about_resp = await fetch_with_handle_redirect(
			TMAP_ABOUT_ENDPOINT,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ about: about_text }),
			}
		)
		if (!edit_about_resp.Response || edit_about_resp.RedirectTo) {
			return (window.location.href = edit_about_resp.RedirectTo ?? '/500')
		}

		const data = await edit_about_resp.Response.json()

		if (is_error_response(data)) {
			set_error(data.error)
		}

		set_is_editing_about(false)
	}

	async function handle_new_pic(e: Event) {
		if (!token) {
			return (window.location.href = '/login')
		}
		const target = e.target as HTMLInputElement
		if (!target.files || target.files.length === 0) {
			return
		}

		const new_pic = target.files[0]
		let formData = new FormData()
		formData.append('pic', new_pic)

		const new_pic_resp = await fetch_with_handle_redirect(
			TMAP_PFP_ENDPOINT,
			{
				method: 'POST',
				headers: { Authorization: `Bearer ${token}` },
				body: formData,
			}
		)
		if (!new_pic_resp.Response || new_pic_resp.RedirectTo) {
			return (window.location.href = new_pic_resp.RedirectTo ?? '/500')
		} else if (new_pic_resp.Response.status > 399) {
			const data = await new_pic_resp.Response.json()
			if (is_error_response(data)) {
				return set_error(data.error)
			} else {
				return console.error(data)
			}
		}

		const new_pic_data = await new_pic_resp.Response.blob()
		set_pic_url(URL.createObjectURL(new_pic_data))
	}

	async function handle_delete_pic(e: MouseEvent) {
		e.preventDefault()
		if (!token) {
			return (window.location.href = '/login')
		}

		const delete_resp = await fetch_with_handle_redirect(
			TMAP_PFP_ENDPOINT,
			{
				method: 'DELETE',
				headers: { Authorization: `Bearer ${token}` },
			}
		)
		if (!delete_resp.Response || delete_resp.RedirectTo) {
			return (window.location.href = delete_resp.RedirectTo ?? '/500')
		} else if (delete_resp.Response.status > 399) {
			const data = await delete_resp.Response.json()
			if (is_error_response(data)) {
				return set_error(data.error)
			} else {
				return console.error(data)
			}
		}

		set_pic_url(undefined)
		set_show_delete_pic_modal(false)
	}

	return (
		<div id='profile-actions'>
			<label id='new-pic-upload-label' for='new-pic-upload'>
				<img
					title='Add profile pic'
					alt='Add profile pic'
					src='../../../upload-pic.svg'
					height={22}
					width={22}
				/>
			</label>
			<input
				id='new-pic-upload'
				type='file'
				accept={'image/*'}
				hidden
				onChange={handle_new_pic}
			/>
			{pic_url ? (
				<button
					title='Remove profile pic'
					id='delete-pfp-btn'
					class='img-btn'
					onClick={(e) => {
						e.preventDefault()
						set_show_delete_pic_modal(true)
					}}
				>
					<img
						src='../../../delete.svg'
						height={22}
						width={22}
						alt='Remove profile pic'
					/>
				</button>
			) : null}
			{show_delete_pic_modal ? (
				<Modal
					Prompt={'Remove profile pic?'}
					IsDeleteConfirmation
					HandleDelete={handle_delete_pic}
					SetShowModal={set_show_delete_pic_modal}
				/>
			) : null}

			{is_editing_about ? (
				<button
					id='confirm-changes'
					title='Save changes to about'
					class='img-btn'
					value='Submit'
					onClick={handle_finished_updating_about}
				>
					<img
						src='../../../confirm.svg'
						height={20}
						width={20}
						alt='Save Changes'
					/>
				</button>
			) : (
				<button
					id='edit-about-btn'
					title='Edit about'
					class='img-btn'
					onClick={() => {
						set_is_editing_about(true)
					}}
				>
					<img
						src='../../../edit.svg'
						height={20}
						width={20}
						alt='Toggle about section editing'
					/>
				</button>
			)}
			{error ? <p className='error'>{error}</p> : null}
		</div>
	)
}
