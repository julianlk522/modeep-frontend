export function get_local_time(utc_date: string) {
	const date = new Date(utc_date)
	const tz_offset_millis = date.getTimezoneOffset() * 60000

	return new Date(date.getTime() - tz_offset_millis).toISOString()
}
