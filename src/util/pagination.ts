import type { PaginationHrefOpts } from '../types'

export default function get_page_href(opts: PaginationHrefOpts): string {
	const { BaseHref: base_href, Page: page, OtherParams: params } = opts

	params.set('page', page.toString())
	return `${base_href}?${params.toString()}`
}
