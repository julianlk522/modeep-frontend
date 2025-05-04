export default function AboutText(props: { About: string }) {
	return (
		<>
			<span className='profile-details-text' style='margin-right: 1ch;'>
				about:
			</span>
			<pre>{props.About ? props.About : ''}</pre>
		</>
	)
}
