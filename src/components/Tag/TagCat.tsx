interface Props {
	Cat: string
	Count?: number
	IsNSFW?: boolean
	Addable?: boolean
	Removable?: boolean
	AddedSignal?: Signal<string | undefined>
	DeletedSignal?: Signal<string | undefined>
	Fat?: boolean
	Href?: string
	IsNewLinkPage?: boolean
	IsMorePage?: boolean
}

import type { Signal } from '@preact/signals'
import { useEffect, useRef } from 'preact/hooks'
import './TagCat.css'

export default function TagCat(props: Props) {
	const {
		Cat: cat,
		IsNSFW: is_nsfw,
		Addable: addable,
		Removable: removable,
		Fat: fat,
		Href: href,
		IsNewLinkPage: is_new_link_page,
		IsMorePage: is_more_page,
	} = props
	const add_btn_ref = useRef<HTMLButtonElement>(null)
	const delete_btn_ref = useRef<HTMLButtonElement>(null)

	useEffect(() => {
		if (!addable) {
			return
		}
		add_btn_ref.current?.addEventListener('click', handle_add)
		add_btn_ref.current?.addEventListener('keydown', (e) =>
			e.stopPropagation()
		)

		return () => {
			add_btn_ref.current?.removeEventListener('click', handle_add)
			add_btn_ref.current?.removeEventListener('keydown', (e) =>
				e.stopPropagation()
			)
		}
	}, [addable])

	async function handle_add(e: MouseEvent) {
		e.preventDefault()

		if (!props.AddedSignal) return
		props.AddedSignal.value = cat
	}

	useEffect(() => {
		if (!removable) {
			return
		}

		delete_btn_ref.current?.addEventListener('click', handle_delete)
		delete_btn_ref.current?.addEventListener('keydown', (e) =>
			e.stopPropagation()
		)

		return () => {
			delete_btn_ref.current?.removeEventListener('click', handle_delete)
			delete_btn_ref.current?.removeEventListener('keydown', (e) =>
				e.stopPropagation()
			)
		}
	}, [removable])

	async function handle_delete(e: MouseEvent) {
		e.preventDefault()

		if (!props.DeletedSignal) return
		props.DeletedSignal.value = cat
	}

	return (
		<li
			title={addable ? `Add '${cat}' to cats filters` : ''}
			class={`cat${addable ? ' addable' : ''}${is_nsfw ? ' nsfw' : ''}${fat ? ' fat' : ''}${is_more_page ? ' more' : ''}`}
		>
			{href ? (
				<>
					<a href={href}>{props.Cat}</a>
					{props.Count ? <span>{` (${props.Count})`}</span> : null}
				</>
			) : (
				<>
					<p>
						{props.Cat}
						{props.Count ? ` (${props.Count})` : ''}
					</p>

					{removable && props.DeletedSignal ? (
						<button
							// without type='button' the click event handler will
							// go off even when you have the input field focused
							// and hit "Enter" because it's treated as a form
							// submission
							type='button'
							ref={delete_btn_ref}
							title={`Remove '${cat}'`}
							class='img-btn'
						>
							<img
								src='../../../delete.svg'
								height={20}
								width={20}
							/>
						</button>
					) : addable && props.AddedSignal ? (
						<button
							type='button'
							ref={add_btn_ref}
							title={
								is_new_link_page
									? `Add '${cat}' to tag`
									: `Add '${cat}' to cats filters`
							}
							class='img-btn plus-btn'
						>
							<img
								src='../../../add.svg'
								height={20}
								width={20}
							/>
						</button>
					) : null}
				</>
			)}
		</li>
	)
}
