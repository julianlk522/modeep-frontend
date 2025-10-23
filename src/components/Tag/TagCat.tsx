interface Props {
	Cat: string
	Count?: number
	IsNSFW?: boolean
	Addable?: boolean
	Neuterable?: boolean
	Neutered?: boolean
	Removable?: boolean
	AddedSignal?: Signal<string | undefined>
	NeuteredSignal?: Signal<string | undefined>
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
		Neuterable: neuterable,
		Neutered: neutered,
		Fat: fat,
		Href: href,
		IsNewLinkPage: is_new_link_page,
		IsMorePage: is_more_page,
	} = props
	const add_btn_ref = useRef<HTMLButtonElement>(null)
	const neuter_btn_ref = useRef<HTMLButtonElement>(null)
	const delete_btn_ref = useRef<HTMLButtonElement>(null)

	useEffect(() => {
		if (!addable) {
			return
		}
		add_btn_ref.current?.addEventListener('click', handle_add)
		add_btn_ref.current?.addEventListener('keydown', (e) => e.stopPropagation())

		return () => {
			add_btn_ref.current?.removeEventListener('click', handle_add)
			add_btn_ref.current?.removeEventListener('keydown', (e) => e.stopPropagation())
		}
	}, [addable])

	useEffect(() => {
		if (!neuterable) {
			return
		}
		neuter_btn_ref.current?.addEventListener('click', handle_neuter)
		neuter_btn_ref.current?.addEventListener('keydown', (e) => e.stopPropagation())

		return () => {
			neuter_btn_ref.current?.removeEventListener('click', handle_neuter)
			neuter_btn_ref.current?.removeEventListener('keydown', (e) => e.stopPropagation())
		}
	}, [neuterable])

	useEffect(() => {
		if (!removable) {
			return
		}

		delete_btn_ref.current?.addEventListener('click', handle_delete)
		delete_btn_ref.current?.addEventListener('keydown', (e) => e.stopPropagation())

		return () => {
			delete_btn_ref.current?.removeEventListener('click', handle_delete)
			delete_btn_ref.current?.removeEventListener('keydown', (e) => e.stopPropagation())
		}
	}, [removable])

	async function handle_add(e: MouseEvent) {
		e.preventDefault()

		if (!props.AddedSignal) return
		props.AddedSignal.value = cat
	}

	async function handle_neuter(e: MouseEvent) {
		e.preventDefault()

		if (!props.NeuteredSignal) return
		props.NeuteredSignal.value = cat
	}

	async function handle_delete(e: MouseEvent) {
		e.preventDefault()

		if (!props.DeletedSignal) return
		props.DeletedSignal.value = cat
	}

	return (
		<li
			title={'Filtering for: ' + cat}
			class={`cat${addable ? ' addable' : ''}${neuterable ? ' neuterable' : ''}${neutered ? ' neutered' : ''}${removable ? ' removable' : ''}${is_new_link_page ? ' new' : ''}${is_nsfw ? ' nsfw' : ''}${fat ? ' fat' : ''}${is_more_page ? ' more' : ''}`}
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
							// without type='button' the click event handler fires
							// even when you have the input field focused and hit
							// "Enter"
							type='button'
							ref={delete_btn_ref}
							title={`Remove '${cat}'${neutered ? ' from neutered cats' : ''}`}
							class='img-btn'
						>
							<img src='../../../delete.svg' height={20} width={20} />
						</button>
					) : null}

					{addable && props.AddedSignal ? (
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

					{neuterable && props.NeuteredSignal ? (
						<button type='button' ref={neuter_btn_ref} title={`Neuter '${cat}'`} class='img-btn neuter-btn'>
							<img src='../../../neuter.svg' height={16} width={16} />
						</button>
					) : null}
				</>
			)}
		</li>
	)
}
