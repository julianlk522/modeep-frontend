import type { URLParams } from '../../../types'

export default function get_non_cats_url_params(params_obj: URLParams) {
	const {
		// cats params reset by clicking a cat - not needed in that case
		Period: period,
		SummaryContains: summary_contains,
		URLContains: url_contains,
		URLLacks: url_lacks,
		SortBy: sort_by,
		NSFW: nsfw,
	} = params_obj

	const params = new URLSearchParams()

	if (period) {
		params.set('period', period)
	}
	if (summary_contains) {
		params.set('summary_contains', summary_contains)
	}
	if (url_contains) {
		params.set('url_contains', url_contains)
	}
	if (url_lacks) {
		params.set('url_lacks', url_lacks)
	}
	if (sort_by) {
		params.set('sort_by', sort_by)
	}
	if (nsfw) {
		params.set('nsfw', nsfw.toString())
	}

	return params.toString()
}
