export interface ITitle {
  romaji?: string
  english?: string
  native?: string
  userPreferred?: string
}

export interface IAnimeResult {
  id: string
  title: string | ITitle
  url?: string
  image?: string
  imageHash?: string
  cover?: string
  coverHash?: string
  status?: MediaStatus
  rating?: number
  type?: MediaFormat
  releaseDate?: string
  relationType?: string
  [x: string]: any // other fields
}

export interface ISearch<T> {
  currentPage?: number
  hasNextPage?: boolean
  totalPages?: number
  /**
   * total results must include results from all pages
   */
  totalResults?: number
  results: T[]
}

export interface Trailer {
  id: string
  url?: string
  site?: string
  thumbnail?: string
  thumbnailHash?: string | null
}

export interface FuzzyDate {
  year?: number
  month?: number
  day?: number
}

export interface ExternalLink {
  id?: string
  url?: string
  sourceName?: string
}

export enum MediaFormat {
  TV = 'TV',
  TV_SHORT = 'TV_SHORT',
  TV_SPECIAL = 'TV_SPECIAL',
  MOVIE = 'MOVIE',
  SPECIAL = 'SPECIAL',
  OVA = 'OVA',
  ONA = 'ONA',
  MUSIC = 'MUSIC',
  MANGA = 'MANGA',
  NOVEL = 'NOVEL',
  ONE_SHOT = 'ONE_SHOT',
  PV = 'PV',
  COMIC = 'COMIC',
}

export interface IAnimeInfo extends IAnimeResult {
  malId?: number | string
  genres?: string[]
  description?: string
  status?: MediaStatus
  totalEpisodes?: number
  /**
   * @deprecated use `hasSub` or `hasDub` instead
   */
  subOrDub?: SubOrSub
  hasSub?: boolean
  hasDub?: boolean
  synonyms?: string[]
  /**
   * two letter representation of coutnry: e.g JP for japan
   */
  countryOfOrigin?: string
  isAdult?: boolean
  isLicensed?: boolean
  /**
   * `FALL`, `WINTER`, `SPRING`, `SUMMER`
   */
  season?: string
  studios?: string[]
  color?: string
  cover?: string
  externalLinks?: ExternalLink[]
  trailer?: Trailer
  episodes?: IAnimeEpisode[]
  startDate?: FuzzyDate
  endDate?: FuzzyDate
  recommendations?: IAnimeResult[]
  relations?: IAnimeResult[]
}

export interface IAnimeEpisodeV2 {
  [x: string]: {
    id: string
    season_number: number
    title: string
    image: string
    imageHash: string
    description: string
    releaseDate: string
    isHD: boolean
    isAdult: boolean
    isDubbed: boolean
    isSubbed: boolean
    duration: number
  }[]
}

export interface IAnimeEpisode {
  id: string
  number: number
  title?: string
  description?: string
  isFiller?: boolean
  isSubbed?: boolean
  isDubbed?: boolean
  url?: string
  image?: string
  imageHash?: string
  releaseDate?: string
  [x: string]: unknown // other fields
}

export interface IEpisodeServer {
  name: string
  url: string
  [x: string]: unknown
}

export enum StreamingServers {
  AsianLoad = 'asianload',
  GogoCDN = 'gogocdn',
  StreamSB = 'streamsb',
  MixDrop = 'mixdrop',
  Mp4Upload = 'mp4upload',
  UpCloud = 'upcloud',
  VidCloud = 'vidcloud',
  StreamTape = 'streamtape',
  VizCloud = 'vizcloud',
  // same as vizcloud
  MyCloud = 'mycloud',
  Filemoon = 'filemoon',
  VidStreaming = 'vidstreaming',
  BuiltIn = 'builtin',
  SmashyStream = 'smashystream',
  StreamHub = 'streamhub',
  StreamWish = 'streamwish',
  VidHide = 'vidhide',
  VidMoly = 'vidmoly',
  Voe = 'voe',
  MegaUp = 'megaup',
  MegaCloud = 'megacloud',
}

export enum MediaStatus {
  ONGOING = 'Ongoing',
  COMPLETED = 'Completed',
  HIATUS = 'Hiatus',
  CANCELLED = 'Cancelled',
  NOT_YET_AIRED = 'Not yet aired',
  UNKNOWN = 'Unknown',
}

export enum WatchListType {
  WATCHING = 'watching',
  ONHOLD = 'on-hold',
  PLAN_TO_WATCH = 'plan to watch',
  DROPPED = 'dropped',
  COMPLETED = 'completed',
  NONE = 'none',
}

export enum SubOrSub {
  SUB = 'sub',
  DUB = 'dub',
  BOTH = 'both',
}

export interface ISubtitle {
  /**
   * The id of the subtitle. **not** required
   */
  id?: string
  /**
   * The **url** that should take you to the subtitle **directly**.
   */
  url: string
  /**
   * The language of the subtitle
   */
  lang: string
}

/**
 * The start, and the end of the intro or opening in seconds.
 */
export interface Intro {
  start: number
  end: number
}

export interface IVideo {
  /**
   * The **MAIN URL** of the video provider that should take you to the video
   */
  url: string
  /**
   * The Quality of the video should include the `p` suffix
   */
  quality?: string
  /**
   * make sure to set this to `true` if the video is hls
   */
  isM3U8?: boolean
  /**
   * set this to `true` if the video is dash (mpd)
   */
  isDASH?: boolean
  /**
   * size of the video in **bytes**
   */
  size?: number
  [x: string]: unknown // other fields
}

export interface ISource {
  headers?: { [k: string]: string }
  intro?: Intro
  outro?: Intro
  subtitles?: ISubtitle[]
  sources: IVideo[]
  download?: string | { url?: string; quality?: string }[]
  embedURL?: string
}
