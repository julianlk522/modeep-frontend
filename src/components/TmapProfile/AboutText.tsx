export default function AboutText(props: { About: string }) {
	return (
		<pre>
			<span className='profile-details-text'>about</span>:{' '}
			{props.About ? props.About : ''}
		</pre>
	)
}
