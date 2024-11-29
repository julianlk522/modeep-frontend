export default function AboutText(props: { About: string }) {
	return <pre>{props.About ? props.About : ''}</pre>
}
