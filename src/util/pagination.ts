import type { PaginationHrefOpts } from '../types'

export default function get_page_href(opts: PaginationHrefOpts): string {
	const {
		BaseHref: base_href,
		Page: page,
		HasOtherParams: has_other_params,
	} = opts

	return base_href + (has_other_params ? `&page=` : `?page=`) + page
}
