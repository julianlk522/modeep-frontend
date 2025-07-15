import {
	useEffect,
	useState,
	type Dispatch,
	type StateUpdater,
} from 'preact/hooks'
import { LINK_PREVIEW_IMG_ENDPOINT, LINKS_ENDPOINT } from '../../constants'
import * as types from '../../types'
import fetch_with_handle_redirect from '../../util/fetch_with_handle_redirect'
import {
	format_long_date,
	get_local_time,
	get_units_ago,
} from '../../util/format_date'
import {
	save_action_and_path_then_redirect_to_login,
	save_path_then_redirect_to_login,
} from '../../util/login_redirect'
import Modal from '../Modal/Modal'
import TagCat from '../Tag/TagCat'
import './Link.css'
import StaticCopyCount from './StaticCopyCount'
import StaticLikeCount from './StaticLikeCount'
import URLZone from './URLZone'

interface Props {
	Link: types.Link
	CatsURLParams?: string
	CatsFromUser?: string
	SetNewLinkCats?: Dispatch<StateUpdater<string[]>>
	IsSummaryPage?: boolean
	IsTagPage?: boolean
	IsTmapPage?: boolean
	IsNewLinkPage?: boolean
	Token?: string
	User?: string
}

export default function Link(props: Props) {
	const {
		CatsURLParams: cats_url_params,
		CatsFromUser: cats_from_user,
		SetNewLinkCats: set_new_link_cats,
		IsSummaryPage: is_summary_page,
		IsTagPage: is_tag_page,
		IsTmapPage: is_tmap_page,
		IsNewLinkPage: is_new_link_page,
		Token: token,
		User: user,
	} = props
	const {
		ID: id,
		URL: url,
		SubmittedBy: submitted_by,
		SubmitDate: submit_date,
		Cats: cats,
		Summary: summary,
		SummaryCount: summary_count,
		TagCount: tag_count,
		ClickCount: click_count,
		PreviewImgFilename: saved_preview_img_filename,
	} = props.Link

	const cats_endpoint =
		is_tmap_page && cats_from_user ? `/map/${cats_from_user}` : '/search'

	const split_cats = cats.split(',')
	const has_one_tag = tag_count === 1
	const is_your_link = user !== undefined && submitted_by === user
	const should_display_full_date =
		is_summary_page || is_tag_page || is_new_link_page

	const [is_copied, set_is_copied] = useState(props.Link.IsCopied)
	const [is_liked, set_is_liked] = useState(props.Link.IsLiked)
	const [like_count, set_like_count] = useState(props.Link.LikeCount)
	const [earliest_likers, set_earliest_likers] = useState(
		props.Link.EarliestLikers
	)
	const [copy_count, set_copy_count] = useState(props.Link.CopyCount)
	const [earliest_copiers, set_earliest_copiers] = useState(
		props.Link.EarliestCopiers
	)
	const [show_delete_modal, set_show_delete_modal] = useState(false)
	const [preview_img_url, set_preview_img_url] = useState<string | undefined>(
		undefined
	)

	const has_likes = like_count > 0
	const has_copies = copy_count > 0
	const has_clicks = click_count > 0

	// hide preview image if path fails to resolve
	useEffect(() => {
		async function get_preview_img() {
			if (!saved_preview_img_filename) {
				return
			}

			const img_resp = await fetch(
				LINK_PREVIEW_IMG_ENDPOINT + `/${saved_preview_img_filename}`,
				{
					headers: {
						'Content-Type': 'image/*',
					},
				}
			)

			if (img_resp.status > 399) {
				console.error(img_resp)
				return set_preview_img_url(undefined)
			}

			const img_blob = await img_resp.blob()
			const img_url = URL.createObjectURL(img_blob)
			set_preview_img_url(img_url)
		}

		get_preview_img()
	}, [saved_preview_img_filename])

	const expected_like_or_copy_action_status = 204
	async function handle_like() {
		if (!token) {
			save_action_and_path_then_redirect_to_login({
				Action: 'like link',
				LinkID: id,
			})
		}

		const resp = await fetch_with_handle_redirect(
			LINKS_ENDPOINT + `/${id}/like`,
			{
				method: is_liked ? 'DELETE' : 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		)
		if (!resp.Response || resp.RedirectTo) {
			return (window.location.href = resp.RedirectTo ?? '/500')
		} else if (
			resp.Response.status !== expected_like_or_copy_action_status
		) {
			const like_data = await resp.Response.json()
			if (types.is_error_response(like_data)) {
				return console.error('Whoops: ', like_data.error)
			}
			return console.error('Whoops: ', like_data)
		}

		if (is_liked) {
			set_is_liked(false)
			set_like_count((prev) => prev - 1)
			set_earliest_likers((prev) =>
				prev
					.split(', ')
					.filter((liker: string) => liker !== user)
					.join(', ')
			)
		} else {
			set_is_liked(true)
			set_like_count((prev) => prev + 1)

			// TODO: replace magic number
			if (like_count < 10) {
				set_earliest_likers((prev) => prev + `, ${user}`)
			}
		}

		return
	}

	async function handle_copy() {
		if (!token) {
			save_action_and_path_then_redirect_to_login({
				Action: 'copy link',
				LinkID: id,
			})
		}

		const resp = await fetch_with_handle_redirect(
			LINKS_ENDPOINT + `/${id}/copy`,
			{
				method: is_copied ? 'DELETE' : 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		)
		if (!resp.Response || resp.RedirectTo) {
			return (window.location.href = resp.RedirectTo ?? '/500')
		} else if (
			resp.Response.status !== expected_like_or_copy_action_status
		) {
			const copy_data = await resp.Response.json()
			if (types.is_error_response(copy_data)) {
				return console.error('Whoops: ', copy_data.error)
			}
			return console.error('Whoops: ', copy_data)
		}

		if (is_copied) {
			set_is_copied(false)
			set_copy_count((prev) => prev - 1)
			set_earliest_copiers((prev) =>
				prev
					.split(', ')
					.filter((copier: string) => copier !== user)
					.join(', ')
			)
		} else {
			set_is_copied(true)
			set_copy_count((prev) => prev + 1)
			if (copy_count < 10) {
				set_earliest_copiers((prev) => prev + `, ${user}`)
			}
		}
		return
	}

	const expected_delete_action_status = 205
	async function handle_delete() {
		if (!token) {
			save_path_then_redirect_to_login()
		} else if (!is_your_link) {
			console.error('not your link')
			return
		}

		const delete_resp = await fetch_with_handle_redirect(LINKS_ENDPOINT, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ link_id: id }),
		})
		if (!delete_resp.Response || delete_resp.RedirectTo) {
			return (window.location.href = delete_resp.RedirectTo ?? '/500')
		} else if (
			delete_resp.Response.status !== expected_delete_action_status
		) {
			const delete_data = await delete_resp.Response.json()
			if (types.is_error_response(await delete_data)) {
				return console.error('Whoops: ', delete_data.error)
			}
			return console.error('Whoops: ', delete_resp.Response)
		}

		// tag / summary pages no longer exist for the deleted link
		if (is_tag_page || is_summary_page) {
			return (window.location.href = `/map/${user}`)
		}

		return window.location.reload()
	}

	return (
		<li class={`link${is_summary_page || is_tag_page ? ' single' : ''}`}>
			{preview_img_url ? (
				<div class='preview'>
					<img
						src={preview_img_url}
						alt={summary ? summary : url}
						width={75}
					/>
					<URLZone
						Link_ID={id}
						URL={url}
						Summary={summary}
						SummaryCount={summary_count}
						IsSummaryPage={is_summary_page}
					/>
				</div>
			) : (
				<URLZone
					Link_ID={id}
					URL={url}
					Summary={summary}
					SummaryCount={summary_count}
					IsSummaryPage={is_summary_page}
				/>
			)}

			<p>
				<span class='by'>by </span>
				<a
					title={`View ${submitted_by}'s Treasure Map`}
					href={`/map/${submitted_by}`}
					class='submitted-by'
				>
					{is_your_link ? 'you' : submitted_by}
				</a>{' '}
				<span class='submit-date'>
					{should_display_full_date
						? is_new_link_page
							? format_long_date(get_local_time(submit_date))
							: format_long_date(submit_date)
						: get_units_ago(submit_date)}
				</span>
			</p>

			{is_tag_page && has_one_tag ? null : (
				<div class='tag'>
					<ul class='cats'>
						{split_cats.map((cat) => {
							const encoded_cat = encodeURIComponent(cat)
							const url_params = cats_url_params
								? `?${cats_url_params}&cats=${encoded_cat}`
								: `?cats=${encoded_cat}`

							return (
								<TagCat
									Cat={cat}
									IsNSFW={cat === 'NSFW'}
									Href={cats_endpoint + url_params}
								/>
							)
						})}

						{is_tag_page ? (
							<li class='tag-count'> ({tag_count})</li>
						) : (
							<li class='tag-count'>
								{' ('}
								<a
									title={`View this link's tags (${tag_count}) or add/edit yours`}
									class='tags-page-link'
									href={`/tag/${id}`}
								>
									<span class='tags-page-link'>
										{tag_count}
									</span>
								</a>
								{')'}
							</li>
						)}
					</ul>

					{set_new_link_cats ? (
						<button
							title='Copy cats to pending new link'
							class='img-btn copy-cats-btn'
							onClick={() => set_new_link_cats(split_cats)}
						>
							<img
								alt='Copy cats to pending new link'
								src='../../copy-cats.svg'
								width={16}
								height={16}
							/>
						</button>
					) : null}
				</div>
			)}

			{!user || user === submitted_by ? (
				<>
					{has_likes ? (
						<StaticLikeCount
							LikeCount={like_count}
							EarliestLikers={earliest_likers}
						/>
					) : null}
					{has_copies ? (
						<StaticCopyCount
							CopyCount={copy_count}
							EarliestCopiers={earliest_copiers}
						/>
					) : null}
				</>
			) : (
				<>
					<button
						title={`${
							is_liked ? 'Unlike' : 'Like'
						} - (${like_count} ${
							like_count === 1 ? 'like' : 'likes'
						}${like_count > 0 ? `: ${earliest_likers}` : ''})`}
						onClick={handle_like}
						class={`like-btn${is_liked ? ' liked' : ''}`}
					>
						{is_liked ? (
							<img
								src='../../liked.svg'
								alt='Unlike link'
								width={16}
								height={16}
							/>
						) : (
							<img
								src='../../like.svg'
								alt='Like link'
								width={16}
								height={16}
							/>
						)}{' '}
						({like_count})
					</button>

					<button
						title={`${
							is_copied ? 'Uncopy' : 'Copy to treasure map'
						} - (${copy_count} ${
							copy_count === 1 ? 'copy' : 'copies'
						}${copy_count > 0 ? `: ${earliest_copiers}` : ''})`}
						onClick={handle_copy}
						class={`copy-btn${is_copied ? ' copied' : ''}`}
					>
						{is_copied ? (
							<img
								src='../../copied.svg'
								alt='Uncopy link'
								width={16}
								height={16}
							/>
						) : (
							<img
								src='../../copy.svg'
								alt='Copy link'
								width={16}
								height={16}
							/>
						)}{' '}
						({copy_count})
					</button>
				</>
			)}
			{has_clicks ? (
				<div
					title={`${click_count} ${
						click_count === 1 ? 'click' : 'clicks'
					}`}
					class='click-count'
				>
					<img
						src='../../click.svg'
						alt='Clicks'
						height={18}
						width={18}
					/>
					<span>{click_count}</span>
				</div>
			) : null}

			{is_your_link ? (
				<>
					<button
						title='Delete Link'
						class='delete-link-btn img-btn'
						onClick={() => set_show_delete_modal(true)}
					>
						<img
							alt='Delete Link'
							src='../../../delete.svg'
							height={20}
							width={20}
						/>
					</button>

					{show_delete_modal ? (
						<Modal
							Prompt={'Delete'}
							IsDeleteConfirmation
							DeleteURL={url}
							HandleDelete={handle_delete}
							SetShowModal={set_show_delete_modal}
						/>
					) : null}
				</>
			) : null}
		</li>
	)
}
