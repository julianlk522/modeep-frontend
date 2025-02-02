import {
	useEffect,
	useState,
	type Dispatch,
	type StateUpdater,
} from 'preact/hooks'
import { LINKS_ENDPOINT } from '../../constants'
import * as types from '../../types'
import { is_error_response } from '../../types'
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
import './Link.css'
import SameUserCopyCount from './SameUserCopyCount'
import SameUserLikeCount from './SameUserLikeCount'
import URLZone from './URLZone'

interface Props {
	Link: types.Link
	CatsFromUser?: string
	IsSummaryPage?: boolean
	IsTagPage?: boolean
	IsTmapPage?: boolean
	IsNewLinkPage?: boolean
	SetNewLinkCats?: Dispatch<StateUpdater<string[]>>
	NSFWCatLinks?: boolean
	Token?: string
	User?: string
}

export default function Link(props: Props) {
	const {
		CatsFromUser: cats_from_user,
		IsSummaryPage: is_summary_page,
		IsTagPage: is_tag_page,
		IsTmapPage: is_tmap_page,
		IsNewLinkPage: is_new_link_page,
		SetNewLinkCats: set_new_link_cats,
		NSFWCatLinks: nsfw_cat_links,
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
		PreviewImgURL: saved_preview_img_url,
	} = props.Link

	const is_your_link = user !== undefined && submitted_by === user
	const cats_endpoint =
		is_tmap_page && cats_from_user ? `/map/${cats_from_user}` : '/search'
	const split_cats = cats.split(',')
	const has_one_tag = tag_count === 1
	const should_display_full_date =
		is_summary_page || is_tag_page || is_new_link_page

	let tag_attribution = is_new_link_page
		? 'tag'
		: cats && user && cats_from_user === user
			? 'your tag'
			: cats_from_user
				? `${cats_from_user}'s tag`
				: 'global tag'
	if (!is_new_link_page) {
		tag_attribution += ` (${tag_count})`
	}

	const [is_copied, set_is_copied] = useState(props.Link.IsCopied)
	const [is_liked, set_is_liked] = useState(props.Link.IsLiked)
	const [like_count, set_like_count] = useState(props.Link.LikeCount)
	const [copy_count, set_copy_count] = useState(props.Link.CopyCount)
	const [show_delete_modal, set_show_delete_modal] = useState(false)
	const [preview_img_url, set_preview_img_url] = useState(
		saved_preview_img_url
	)

	// hide preview image if URL fails to resolve
	useEffect(() => {
		if (saved_preview_img_url) {
			// use Image constructor so no CORS issues, even during local dev
			const img = new Image()
			img.onload = () => set_preview_img_url(saved_preview_img_url)
			img.onerror = () => set_preview_img_url(undefined)
			img.src = saved_preview_img_url
		}
	}, [saved_preview_img_url])

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
			if (is_error_response(like_data)) {
				return console.error('Whoops: ', like_data.error)
			}
			return console.error('Whoops: ', like_data)
		}

		if (is_liked) {
			set_is_liked(false)
			set_like_count((prev) => prev - 1)
		} else {
			set_is_liked(true)
			set_like_count((prev) => prev + 1)
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
			if (is_error_response(copy_data)) {
				return console.error('Whoops: ', copy_data.error)
			}
			return console.error('Whoops: ', copy_data)
		}

		if (is_copied) {
			set_is_copied(false)
			set_copy_count((prev) => prev - 1)
		} else {
			set_is_copied(true)
			set_copy_count((prev) => prev + 1)
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
			if (is_error_response(await delete_data)) {
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
						width={100}
					/>
					<URLZone link_id={id} url={url} summary={summary} />
				</div>
			) : (
				<URLZone link_id={id} url={url} summary={summary} />
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
						? format_long_date(submit_date)
						: get_units_ago(
								is_new_link_page
									? get_local_time(submit_date)
									: submit_date
							)}
				</span>
			</p>

			{is_tag_page && has_one_tag ? null : (
				<div class='tags'>
					<a
						title={`View tags for this link (${tag_count} total), add or edit yours`}
						class='tags-page-link'
						href={`/tag/${id}`}
					>
						{tag_attribution}
					</a>
					{': '}
					<ul class='cats'>
						{split_cats.map((cat, i) => (
							<li>
								{i === split_cats.length - 1 ? (
									<a
										class={cat === 'NSFW' ? 'nsfw' : ''}
										href={
											cats_endpoint +
											`?cats=${encodeURIComponent(cat)}${nsfw_cat_links ? '&nsfw=true' : ''}`
										}
									>
										{cat}
									</a>
								) : (
									<>
										<a
											class={cat === 'NSFW' ? 'nsfw' : ''}
											href={
												cats_endpoint +
												`?cats=${encodeURIComponent(cat)}${nsfw_cat_links ? '&nsfw=true' : ''}`
											}
										>
											{cat}
										</a>
										,{' '}
									</>
								)}
							</li>
						))}
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

			{is_summary_page ? null : (
				<p class='summaries-page-link'>
					<a
						title={`View summaries for this link (${summary_count} total), add or edit yours`}
						href={`/summary/${id}`}
					>
						{summary_count === 1
							? 'summary'
							: `summaries (${summary_count})`}
					</a>
				</p>
			)}

			{user !== submitted_by ? (
				<>
					<button
						title={`${is_liked ? 'Unlike' : 'Like'} link (liked by ${like_count} ${like_count === 1 ? 'person' : 'people'})`}
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
							is_copied
								? 'Uncopy link'
								: 'Copy to your Treasure Map'
						} (copied by ${copy_count} ${copy_count === 1 ? 'person' : 'people'})`}
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
			) : (
				<>
					<SameUserLikeCount LikeCount={like_count} />
					<SameUserCopyCount CopyCount={copy_count} />
				</>
			)}

			{click_count > 0 ? (
				<div
					title={`${click_count} ${click_count === 1 ? 'click' : 'clicks'}`}
					class='click-count'
				>
					<img src='../../click.svg' height={18} width={18} />
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
