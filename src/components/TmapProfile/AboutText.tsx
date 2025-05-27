export default function AboutText(props: { About: string }) {
	return (
		<>
			<span style='margin-right: 1ch;'>About:</span>
			<strong>
				<pre>{props.About ? props.About : ''}</pre>
			</strong>
		</>
	)
}
