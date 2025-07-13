// ERROR
type ErrorResponse = {
	status: string
	error: string
}

function is_error_response(obj: any): obj is ErrorResponse {
	return obj.error !== undefined
}

// FETCH
const Redirects = ['/404', '/500', '/login', '/rate-limit'] as const
type RedirectTo = (typeof Redirects)[number]

type ResponseAndRedirect = {
	Response: Response | undefined
	RedirectTo: RedirectTo | undefined
}

// USER
type Profile = {
	LoginName: string
	PFP: string
	About: string
	Email: string
	Created: string
}

// LINK
type Link = {
	ID: string
	URL: string
	SubmittedBy: string
	SubmitDate: string
	Cats: string
	Summary?: string
	SummaryCount: number
	IsLiked?: boolean
	LikeCount: number
	EarliestLikers: string
	IsCopied?: boolean
	EarliestCopiers: string
	CopyCount: number
	TagCount: number
	ClickCount: number
	PreviewImgFilename?: string
}

type PaginatedLinks = {
	Links: Link[]
	NSFWLinks: number
	MergedCats?: string[]
	Pages: number
}

type URLParams = {
	Cats?: string
	Period?: Period
	URLContains?: string
	SortBy?: SortMetric
	NSFW?: boolean
	Page?: number
}

const Periods = ['day', 'week', 'month', 'year', 'all'] as const
type Period = (typeof Periods)[number]

const SortMetrics = ['rating', 'newest'] as const
type SortMetric = (typeof SortMetrics)[number]

// TAG
type Tag = {
	ID: string
	Cats: string
	SubmittedBy: string
	LastUpdated: string
}

type TagRanking = Tag & { LifeSpanOverlap: number }

type TagPage = {
	Link: Link
	UserTag?: Tag
	TagRankings: TagRanking[]
}

// CATEGORY
type CatCount = {
	Category: string
	Count: number
}

type MorePageCatCountsWithMergedCats = {
	Counts: CatCount[]
	MergedCats?: string[]
}

function has_merged_cats_property(
	obj: any
): obj is MorePageCatCountsWithMergedCats {
	return obj?.MergedCats !== undefined
}

type Contributor = {
	LoginName: string
	LinksSubmitted: number
}

// SUMMARY
type Summary = {
	ID: string
	Text: string
	SubmittedBy: string
	LastUpdated: string
	LikeCount: number
	EarliestLikers: string
	IsLiked?: boolean
}

type SummaryPage = {
	Link: Link
	Summaries: Summary[]
}

// TOTALS
type Totals = {
	Links: number
	Clicks: number
	Likes: number
	Tags: number
	Summaries: number
	Contributors: number
}

// TREASURE MAP
type TmapLink = Link & { CatsFromUser?: boolean }

type FilteredTreasureMap = {
	Submitted: TmapLink[]
	Copied: TmapLink[]
	Tagged: TmapLink[]
	SectionsWithMore: string[]
	Cats: CatCount[]
	NSFWLinksCount: number
}

type TreasureMap = FilteredTreasureMap & { Profile: Profile }

type TreasureMapSection = {
	Links: TmapLink[]
	Cats: CatCount[]
	NSFWLinksCount: number
	Pages: number
}

const tmap_sections = ['Submitted', 'Copied', 'Tagged'] as const

// PAGINATION
type PaginationHrefOpts = {
	BaseHref: string
	Page: number
	OtherParams: URLSearchParams
}

export {
	has_merged_cats_property,
	is_error_response,
	Periods,
	SortMetrics,
	tmap_sections,
}
export type {
	CatCount,
	Contributor,
	ErrorResponse,
	FilteredTreasureMap,
	Link,
	MorePageCatCountsWithMergedCats,
	PaginatedLinks,
	PaginationHrefOpts,
	Period,
	Profile,
	ResponseAndRedirect,
	SortMetric,
	Summary,
	SummaryPage,
	Tag,
	TagPage,
	TmapLink,
	Totals,
	TreasureMap,
	TreasureMapSection,
	URLParams,
}
