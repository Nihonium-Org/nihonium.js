export interface IKuroji {
	id: number
	idMal?: number
	title: ITitle
	bannerImage?: string
	status?: string
	type?: string
	format?: string
	coverImage: ICover
	updatedAt: number
	description?: string
	startDate: IFuzzyDate
	endDate: IFuzzyDate
	season?: string
	seasonYear?: number
	episodes?: number
	sub?: number
	dub?: number
	duration?: number
	countryOfOrigin?: string
	isLicensed?: boolean
	source?: string
	hashTag?: string
	isLocked?: boolean
	isAdult?: boolean
	averageScore?: number
	meanScore?: number
	score?: number
	popularity?: number
	trending?: number
	favourites?: number
	genres?: string[]
	synonyms?: string[]
	trailer?: ITrailer
	studios: IStudioEdge[]
	airingSchedule: IAiringSchedule[]
	tags: ITag[]
	rankings: IRanking[]
	externalLinks: IExternalLink[]
	streamingEpisodes: IStreamingEpisode[]
	scoreDistribution: IScoreDistribution[]
	statusDistribution: IStatusDistribution[]

	shikimori: IShikimori
	kitsu: IKitsu
}

export interface ITitle {
	romaji?: string
	english?: string
	native?: string
}

export interface ICover {
	color?: string
	large?: string
	medium?: string
	extraLarge?: string
}

export interface IFuzzyDate {
	day?: number
	month?: number
	year?: number
}

export interface ITrailer {
	id: string
	site?: string
	thumbnail?: string
}

export interface ICharacterEdge {
	role?: string
	character: ICharacter
	voiceActors: IVoiceActor[]
}

export interface ICharacter {
	name: IName
	image: IImage
}

export interface IVoiceActor {
	language?: string
	name: IName
	image: IImage
}

export interface IName {
	full?: string
	native?: string
	alternative?: string[]
}

export interface IImage {
	large?: string
	medium?: string
}

export interface ITag {
	id: number
	name?: string
	description?: string
	category?: string
	rank?: number
	isSpoiler?: boolean
	isAdult?: boolean
}

export interface IExternalLink {
	id: number
	url?: string
	site?: string
	siteId?: number
	type?: string
	language?: string
	color?: string
	icon?: string
	notes?: string
	isDisabled?: boolean
}

export interface IStreamingEpisode {
	title?: string
	thumbnail?: string
	url?: string
	site?: string
}

export interface IStudioEdge {
	isMain?: boolean
	stduio: IStudio
}

export interface IStudio {
	id: number
	name?: string
}

export interface IAiringSchedule {
	id: number
	episode?: number
	airingAt?: number
}

export interface IRanking {
	id: number
	rank?: number
	type?: string
	format?: string
	year?: number
	season?: string
	allTime?: boolean
	context?: string
}

export interface IScoreDistribution {
	score?: number
	amount?: number
}

export interface IStatusDistribution {
	status?: string
	amount?: number
}

export interface IBasicShikimori {
	id?: string
	malId?: number
	russian?: string
	licenseNameRu?: string
	episodes?: number
	episodesAired?: number
	url?: string
	franchise?: string
	poster?: IPoster
}

export interface IBasicKitsu {
	id?: string
	anilistId?: number
	titles?: IKitsuTitle
	slug?: string
	synopsis?: string
	episodeCount?: number
	episodeLength?: number
	canonicalTitle?: string
	averageRating?: string
	ageRating?: string
	ageRatingGuide?: string
	posterImage?: IKitsuPoster
	coverImage?: IKitsuCover
	showType?: string
}

export interface IBasicKuroji {
	id: number
	idMal?: number

	title?: ITitle

	synonyms?: string[]

	bannerImage?: string
	coverImage?: ICover

	type?: string
	format?: string
	status?: string
	description?: string
	moreInfo?: string

	startDate?: IFuzzyDate

	season?: string
	seasonYear?: number

	episodes?: number
	sub?: number
	dub?: number
	duration?: number

	countryOfOrigin?: string
	popularity?: number
	favourites?: number

	score?: number

	isLocked?: boolean
	isAdult?: boolean

	genres?: string[]

	nextAiringEpisode?: IAiringSchedule

	shikimori?: IBasicShikimori
	kitsu?: IBasicKitsu
}

export interface IFranchise {
	cover?: string
	banner?: string
	title?: string
	franchise?: string
	description?: string
}

export type Weekday =
	| 'monday'
	| 'tuesday'
	| 'wednesday'
	| 'thursday'
	| 'friday'
	| 'saturday'
	| 'sunday'

export type TSchedule = {
	[key in Weekday]: IScheduleData
}

export interface IScheduleData {
	current: boolean
	data: IBasicKuroji[]
}

/*
	Shikimori
*/
export interface IShikimori {
	id: string
	idMal?: number
	name?: string
	russian?: string
	licenseNameRu?: string
	english?: string
	japanese?: string
	poster?: IPoster
	synonyms: string[]
	kind?: string
	rating?: string
	score?: number
	status?: string
	episodes?: number
	episodesAired?: number
	duration?: number
	airedOn: IShikimoriFuzzyDate
	releasedOn: IShikimoriFuzzyDate
	franchise?: string
	url?: string
	season?: string
	createdAt?: string
	updatedAt?: string
	nextEpisodeAt?: string
	videos: IKurojiVideo[]
	screenshots: IScreenshot[]
}

export interface IPoster {
	id: number
	originalUrl?: string
	mainUrl?: string
}

export interface IShikimoriFuzzyDate extends IFuzzyDate {
	date?: string
}

export interface IKurojiVideo {
	id: string
	url?: string
	name?: string
	kind?: string
	playerUrl?: string
	imageUrl?: string
}

export interface IScreenshot {
	id: string
	originalUrl?: string
	x166Url?: string
	x332Url?: string
}

/*
	Kitsu
*/
export interface IKitsu {
	id: string
	anilistId?: number
	type?: string
	selfLink?: string
	createdAt?: string
	updatedAt?: string
	slug?: string
	synopsis?: string
	coverImageTopOffset?: number
	canonicalTitle?: string
	abbreviatedTitles?: string[]
	averageRating?: string
	userCount?: number
	favoritesCount?: number
	startDate?: string
	endDate?: string
	popularityRank?: number
	ratingRank?: number
	ageRating?: string
	ageRatingGuide?: string
	subtype?: string
	status?: string
	tba?: string
	episodeCount?: number
	episodeLength?: number
	youtubeVideoId?: string
	showType?: string
	nsfw: boolean

	titles?: IKitsuTitle
	posterImage?: IKitsuPoster
	coverImage?: IKitsuCover

	// Relationships
	genres?: IKitsuRelationship
	categories?: IKitsuRelationship
	castings?: IKitsuRelationship
	installments?: IKitsuRelationship
	mappings?: IKitsuRelationship
	reviews?: IKitsuRelationship
	mediaRelationships?: IKitsuRelationship
	episodes?: IKitsuRelationship
	streamingLinks?: IKitsuRelationship
	animeProductions?: IKitsuRelationship
	animeCharacters?: IKitsuRelationship
	animeStaff?: IKitsuRelationship
}

export interface IKitsuTitle {
	en?: string
	en_jp?: string
	ja_jp?: string
}

export interface IKitsuImage {
	tiny?: string
	small?: string
	large?: string
	original?: string
}

export interface IKitsuPoster extends IKitsuImage {
	medium?: string
	dimensions: IKitsuPosterImageDimensions[]
}

export interface IKitsuCover extends IKitsuImage {
	dimensions: IKitsuImageDimensions
}

export interface IKitsuImageDimensions {
	tiny: IKitsuDimension
	small: IKitsuDimension
	large: IKitsuDimension
}

export interface IKitsuPosterImageDimensions extends IKitsuImageDimensions {
	medium: IKitsuDimension
}

export interface IKitsuDimension {
	width?: number
	height?: number
}

export interface IKitsuRelationship {
	selfLink: string
	related: string
}

/*
	Streaming
*/
export interface IEpisode {
	title?: string
	image?: IEpisodeImage
	number?: number
	overview?: string
	date?: string
	duration?: number
	filler?: boolean
	sub?: boolean
	dub?: boolean
}

export interface IEpisodeDetails extends IEpisode {
	images: EpisodeImage[]
}

export interface EpisodeImage {
	image: IEpisodeImage
	aspectRation?: number
	height?: number
	width?: number
	iso_639_1?: string
	voteAverage?: number
	voteCount?: number
}

export interface IEpisodeImage {
	w300: string
	w500: string
	original: string
}

export interface IProvider extends IEpisode {
	providers: IProviderInfo[]
}

export interface IProviderInfo {
	id: string
	filler: boolean
	provider: EProvider
	type: ESourceType
}

export enum EProvider {
	zoro = 'zoro',
	animekai = 'animekai',
	animepahe = 'animepahe',
}

export enum ESourceType {
	soft_sub = 'soft_sub',
	hard_sub = 'hard_sub',
	dub = 'dub',
	both = 'both',
}

/*
	Responses
*/
export interface Response<T> {
	pageInfo: PageInfo
	data: T
}

export interface SearchResponse<T> extends Response<T> {
	franchise: FranchiseResponse
}

export interface FranchiseResponse {
	pageInfo: PageInfo
	franchise: IFranchise
	data: IBasicKuroji[]
}

export interface PageInfo {
	total: number
	perPage: number
	currentPage: number
	lastPage: number
	hasNextPage: boolean
}
