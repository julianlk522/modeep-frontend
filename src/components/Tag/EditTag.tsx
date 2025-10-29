import { useEffect, useState } from 'preact/hooks'
import { COOKIE_LIFETIME_SECS, EXPECTED_TAG_DELETE_REQ_STATUS, TAGS_ENDPOINT } from '../../constants'
import type { Tag } from '../../types'
import { is_error_response } from '../../types'
import fetch_with_handle_redirect from '../../util/fetch_with_handle_redirect'
import { format_long_date } from '../../util/format_date'
import Modal from '../Modal/Modal'
import SearchCats from '../SearchFilters/Cats'
import './EditTag.css'
interface Props {
	LinkID: string
	YourTag?: Tag
	HasOneTag: boolean
	Token?: string
}

export default function EditTag(props: Props) {
	const {
		LinkID: link_id,
		YourTag: your_tag,
		HasOneTag: has_one_tag,
		Token: token,
	} = props
	const initial_cats = your_tag ? your_tag.Cats.split(',') : []
	const you_have_an_existing_tag = your_tag !== null
	const tag_is_deletable = you_have_an_existing_tag && !has_one_tag

	const [cats, set_cats] = useState<string[]>(initial_cats)
	const [editing, set_editing] = useState(false)
	const [error, set_error] = useState<string | undefined>(undefined)
	const [show_delete_modal, set_show_delete_modal] = useState(false)

	const has_changes = cats.length !== initial_cats.length ||
		cats.some((c, i) => c !== initial_cats[i])

	// this is in a useEffect so edit-tag-btn
	// can live in child SearchCats.tsx and trigger confirm_changes() without
	// passing link_id, token, etc. as props
	useEffect(() => {
		if (editing) return
		if (has_changes) {
			set_cats(cats.sort())
			confirm_changes()
		}
	}, [editing])

	async function confirm_changes() {
		if (!token) {
			document.cookie = `redirect_to=${window.location.pathname.replaceAll(
				'/',
				'%2F'
			)}; path=/login; max-age=${COOKIE_LIFETIME_SECS}; SameSite=strict; Secure`
			return (window.location.href = '/login')
		}

		const request_method = your_tag ? 'PUT' : 'POST'
		const cats_str = cats.join(',')
		const payload = your_tag
			? { tag_id: your_tag.ID, cats: cats_str }
			: { link_id: link_id, cats: cats_str }
		const resp = await fetch_with_handle_redirect(TAGS_ENDPOINT, {
			method: request_method,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(payload),
		})
		if (!resp.Response || resp.RedirectTo) {
			return (window.location.href = resp.RedirectTo ?? '/500')
		}

		const expected_status = your_tag ? 200 : 201
		if (resp.Response.status !== expected_status) {
			console.error('WHOOPS: ', resp)

			const tag_data = await resp.Response.json()
			if (is_error_response(tag_data)) {
				return set_error(tag_data.error)
			}
		}

		return window.location.reload()
	}

	async function handle_delete() {
		if (!your_tag) {
			return
		}

		if (!token) {
			document.cookie = `redirect_to=${window.location.pathname.replaceAll(
				'/',
				'%2F'
			)}; path=/login; max-age=${COOKIE_LIFETIME_SECS}; SameSite=strict; Secure`
			return (window.location.href = '/login')
		}

		const delete_resp = await fetch_with_handle_redirect(TAGS_ENDPOINT, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ tag_id: your_tag.ID }),
		})
		if (!delete_resp.Response || delete_resp.RedirectTo) {
			return (window.location.href = delete_resp.RedirectTo ?? '/500')
		}

		if (delete_resp.Response.status !== EXPECTED_TAG_DELETE_REQ_STATUS) {
			console.error('WHOOPS: ', delete_resp)

			const delete_tag_data = await delete_resp.Response.json()
			if (is_error_response(delete_tag_data)) {
				return set_error(delete_tag_data.error)
			}
		}

		return window.location.reload()
	}

	return (
		<section id='edit-tag'>
			<form onSubmit={(e) => e.preventDefault()}>
				<h2 id='your-tag'>Your Tag</h2>

				{error ? <p class='error'>{error}</p> : null}

				<SearchCats SelectedCats={cats} SetSelectedCats={set_cats} Editable={editing} IsTagPage />

				{!editing ? (
					your_tag ? (
						<p class='last-updated'>{format_long_date(your_tag.LastUpdated)}</p>
					) : (
						<p style='margin-top: 0;'>(not tagged)</p>
					)
				) : null}

				<>
					<button
						title={editing 
							? has_changes 
								? 'Save changes?' 
								: 'Cancel changes?'
							: 'Edit your tag?'}
						onClick={() => {
							if (editing && you_have_an_existing_tag && !cats.length) {
								set_error('Surely SOMETHING can describe this? (at least 1 cat is required.)')
								return
							}
							set_editing((e) => !e)
						}}
						id='edit-tag-btn'
					>{editing 
						? has_changes 
							? 'Save' 
							: 'Cancel'
						: 'Edit'
					}</button>

					{editing && has_changes? (
						<button
							title='Revert changes?'
							id='revert-btn'
							onClick={() => {
								set_cats(initial_cats)
							}}
						>Revert</button>
					) : null}

					{editing && tag_is_deletable ? (
						<button
							title='Delete your tag?'
							id='delete-tag-btn'
							class='img-btn'
							onClick={() => set_show_delete_modal(true)}
						>
							<img
								src='../../../delete.svg'
								height={20}
								width={20}
							/>
						</button>
					) : null}
				</>

				{show_delete_modal ? (
					<Modal
						Prompt={'Delete your tag?'}
						IsDeleteConfirmation
						HandleDelete={handle_delete}
						SetShowModal={set_show_delete_modal}
					/>
				) : null}
			</form>
		</section>
	)
}
