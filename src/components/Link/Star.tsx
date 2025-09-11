import './Star.css'

interface Props {
	IsActive?: boolean
	IsStatic?: boolean
}

export default function Star(props: Props) {
	const { IsActive: is_active, IsStatic: is_static } = props

	return is_static ? (
		<img
			class='star static'
			height='20'
			width='20'
			src='../../star-filled.svg'
		/>
	) : is_active ? (
		<img
			class='star active'
			height='20'
			width='20'
			src='../../star-filled.svg'
		/>
	) : (
		<img
			class='star inactive'
			height='20'
			width='20'
			src='../../star-outline.svg'
		/>
	)
}
