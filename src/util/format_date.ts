export function format_long_date(date: string): string {
	const date_obj = new Date(date)
	return new Intl.DateTimeFormat('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
	}).format(date_obj) // May 4, 2024 8:08:44 PM
}

export function format_short_date(date: string): string {
	const date_obj = new Date(date)
	return new Intl.DateTimeFormat('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
		hour12: true,
	}).format(date_obj) // May 4, 2024
}

export function get_units_ago(date: string): string {
	const date_obj = new Date(date)
	const now = new Date()

	const diff_millis = now.getTime() - date_obj.getTime()
	const diff_seconds = Math.floor(diff_millis / 1000)
	const diff_minutes = Math.floor(diff_seconds / 60)
	const diff_hours = Math.floor(diff_minutes / 60)
	const diff_days = Math.floor(diff_hours / 24)
	const diff_weeks = Math.floor(diff_days / 7)
	const diff_months = Math.floor(diff_days / 30)
	const diff_years = Math.floor(diff_days / 365)

	if (diff_years > 0) {
		return `${diff_years} year${diff_years > 1 ? 's' : ''} ago`
	} else if (diff_months > 0) {
		return `${diff_months} month${diff_months > 1 ? 's' : ''} ago`
	} else if (diff_weeks > 0) {
		return `${diff_weeks} week${diff_weeks > 1 ? 's' : ''} ago`
	} else if (diff_days > 0) {
		return `${diff_days} day${diff_days > 1 ? 's' : ''} ago`
	} else if (diff_hours > 0) {
		return `${diff_hours} hour${diff_hours > 1 ? 's' : ''} ago`
	} else if (diff_minutes > 0) {
		return `${diff_minutes} minute${diff_minutes > 1 ? 's' : ''} ago`
	} else if (diff_seconds > 0) {
		return `${diff_seconds} second${diff_seconds > 1 ? 's' : ''} ago`
	} else {
		return 'just now'
	}
}
