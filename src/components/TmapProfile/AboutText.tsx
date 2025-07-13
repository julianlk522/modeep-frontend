export default function AboutText(props: { About: string }) {
	return (
		<strong>
			<pre>{props.About ? props.About : ''}</pre>
		</strong>
	)
}
