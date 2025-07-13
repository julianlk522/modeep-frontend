import type { URLParams } from '../../../types'

export default function get_cats_url_params(params_obj: URLParams) {
	const {
		// no need for cats params since they will be reset by clicking a cat
		Period: period,
		URLContains: url_contains,
		SortBy: sort_by,
		NSFW: nsfw,
	} = params_obj

	const params = new URLSearchParams()

	if (period) {
		params.set('period', period)
	}
	if (url_contains) {
		params.set('url_contains', url_contains)
	}
	if (sort_by) {
		params.set('sort_by', sort_by)
	}
	if (nsfw) {
		params.set('nsfw', nsfw.toString())
	}

	return params.toString()
}
