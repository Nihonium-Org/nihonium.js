import { Options } from 'ky';

declare const _default$1: {};

interface ISubtitle {
    /**
     * The id of the subtitle. **not** required
     */
    id?: string;
    /**
     * The **url** that should take you to the subtitle **directly**.
     */
    url: string;
    /**
     * The language of the subtitle
     */
    lang: string;
}
/**
 * The start, and the end of the intro or opening in seconds.
 */
interface Intro {
    start: number;
    end: number;
}
interface IVideo {
    /**
     * The **MAIN URL** of the video provider that should take you to the video
     */
    url: string;
    /**
     * The Quality of the video should include the `p` suffix
     */
    quality?: string;
    /**
     * make sure to set this to `true` if the video is hls
     */
    isM3U8?: boolean;
    /**
     * set this to `true` if the video is dash (mpd)
     */
    isDASH?: boolean;
    /**
     * size of the video in **bytes**
     */
    size?: number;
    [x: string]: unknown;
}
interface ISource {
    headers?: {
        [k: string]: string;
    };
    intro?: Intro;
    outro?: Intro;
    subtitles?: ISubtitle[];
    sources: IVideo[];
    download?: string | {
        url?: string;
        quality?: string;
    }[];
    embedURL?: string;
}

/**
 * Represents proxy configuration.
 * @property {string | string[]} url - The proxy URL or array of URLs for rotation.
 * @property {string} [key] - X-API-Key header value (if any).
 * @property {number} [rotateInterval] - The proxy rotation interval in milliseconds. (default: 5000)
 */
interface ProxyConfig {
    url: string | string[];
    key?: string;
    rotateInterval?: number;
}
/**
 * Represents the response of a request.
 * @property {T | null} data - The data returned by the request, or null if the request failed.
 * @property {Error | null} error - The error that occurred during the request, or null if the request was successful.
 * @property {boolean} isHTTPError - Indicates if the error was an HTTP error.
 * @property {boolean} isOnRateLimit - Indicates if the request hit the rate limit.
 * @property {boolean} isLoading - Indicates if the request is currently loading.
 * @property {boolean} isFetching - Indicates if the request is currently fetching data.
 * @property {boolean} isPending - Indicates if the request is pending.
 * @property {boolean} isFetched - Indicates if the request has been fetched.
 * @property {boolean} isLoaded - Indicates if the request has been loaded.
 * @property {Response | null} response - The raw Response object when manualParse is true.
 */
interface RequestResponse<T> {
    data: T | null;
    error: Error | null;
    isHTTPError: boolean;
    isOnRateLimit: boolean;
    isLoading: boolean;
    isFetching: boolean;
    isPending: boolean;
    isFetched: boolean;
    isLoaded: boolean;
    response: Response | null;
}
/**
 * Represents a client for making HTTP requests.
 */
declare class NihoniumClient {
    private client;
    private baseUrl?;
    private rateLimitInfo;
    private proxyConfig?;
    private proxyUrls;
    private currentProxyIndex;
    private rotationInterval?;
    private validUrl;
    /**
     * Creates a new instance of the NihoniumClient.
     * @param {string} [baseUrl] - The base URL for the requests.
     * @param {ProxyConfig} [proxyConfig] - The proxy configuration.
     */
    constructor(baseUrl?: string, proxyConfig?: ProxyConfig);
    /**
     * Set or change the proxy configuration.
     * @param {ProxyConfig} proxyConfig - The proxy configuration.
     */
    setProxy(proxyConfig: ProxyConfig): void;
    /**
     * Setup proxy rotation for multiple URLs.
     * @param {ProxyConfig} proxyConfig - The proxy configuration.
     */
    private setupProxyRotation;
    /**
     * Get the current proxy URL.
     * @returns {string | null} The current proxy URL or null if no proxy is configured.
     */
    private getCurrentProxyUrl;
    /**
     * Handles rate limit information from the response headers.
     * @param {Response} response - The response from the request.
     * @returns {Promise<void>} - A promise that resolves when the rate limit information has been handled.
     */
    private handleRateLimit;
    /**
     * Transforms the URL to go through proxy if configured.
     * @param {string} url - The original URL.
     * @returns {string} The transformed URL.
     */
    private transformUrlForProxy;
    /**
     * Handles a request and returns the response.
     * @param {string} method - The HTTP method to use for the request.
     * @param {string} url - The URL for the request.
     * @param {KyOptions & { manualParse?: boolean }} [options] - Additional options for the request.
     * @returns {Promise<RequestResponse<T>>} - A promise that resolves to the response of the request.
     */
    private handleRequest;
    /**
     * Makes a GET request.
     * @param {string} url - The URL for the request.
     * @param {KyOptions & { manualParse?: boolean }} [options] - Additional options for the request.
     * @returns {Promise<RequestResponse<T>>} - A promise that resolves to the response of the request.
     */
    get<T>(url: string, options?: Options & {
        manualParse?: boolean;
    }): Promise<RequestResponse<T>>;
    /**
     * Makes a POST request.
     * @param {string} url - The URL for the request.
     * @param {KyOptions & { manualParse?: boolean }} [options] - Additional options for the request.
     * @returns {Promise<RequestResponse<T>>} - A promise that resolves to the response of the request.
     */
    post<T>(url: string, options?: Options & {
        manualParse?: boolean;
    }): Promise<RequestResponse<T>>;
    /**
     * Makes a PUT request.
     * @param {string} url - The URL for the request.
     * @param {KyOptions & { manualParse?: boolean }} [options] - Additional options for the request.
     * @returns {Promise<RequestResponse<T>>} - A promise that resolves to the response of the request.
     */
    put<T>(url: string, options?: Options & {
        manualParse?: boolean;
    }): Promise<RequestResponse<T>>;
    /**
     * Makes a DELETE request.
     * @param {string} url - The URL for the request.
     * @param {KyOptions & { manualParse?: boolean }} [options] - Additional options for the request.
     * @returns {Promise<RequestResponse<T>>} - A promise that resolves to the response of the request.
     */
    delete<T>(url: string, options?: Options & {
        manualParse?: boolean;
    }): Promise<RequestResponse<T>>;
    /**
     * Makes a PATCH request.
     * @param {string} url - The URL for the request.
     * @param {KyOptions & { manualParse?: boolean }} [options] - Additional options for the request.
     * @returns {Promise<RequestResponse<T>>} - A promise that resolves to the response of the request.
     */
    patch<T>(url: string, options?: Options & {
        manualParse?: boolean;
    }): Promise<RequestResponse<T>>;
    /**
     * Cleanup method to clear intervals when the client is no longer needed.
     */
    destroy(): void;
}
/**
 * Creates a new instance of the NihoniumClient with a default base URL.
 */
declare const nihonium: NihoniumClient;

declare class BaseProvider {
    protected client: NihoniumClient;
    protected proxyConfig?: ProxyConfig;
    protected baseUrl?: string;
    constructor(baseUrl?: string, proxyConfig?: ProxyConfig);
}

declare abstract class MetaProvider extends BaseProvider {
    protected abstract readonly baseUrl: string;
    protected abstract readonly name: string;
    protected abstract readonly headers: Record<string, string>;
}

declare enum MediaType {
    ANIME = "ANIME",
    MANGA = "MANGA"
}
declare enum MediaFormat {
    TV = "TV",
    TV_SHORT = "TV_SHORT",
    MOVIE = "MOVIE",
    SPECIAL = "SPECIAL",
    OVA = "OVA",
    ONA = "ONA",
    MUSIC = "MUSIC",
    MANGA = "MANGA",
    NOVEL = "NOVEL",
    ONE_SHOT = "ONE_SHOT"
}
declare enum MediaStatus {
    FINISHED = "FINISHED",
    RELEASING = "RELEASING",
    NOT_YET_RELEASED = "NOT_YET_RELEASED",
    CANCELLED = "CANCELLED",
    HIATUS = "HIATUS"
}
declare enum MediaSeason {
    WINTER = "WINTER",
    SPRING = "SPRING",
    SUMMER = "SUMMER",
    FALL = "FALL"
}
declare enum MediaSource {
    ORIGINAL = "ORIGINAL",
    MANGA = "MANGA",
    LIGHT_NOVEL = "LIGHT_NOVEL",
    VISUAL_NOVEL = "VISUAL_NOVEL",
    VIDEO_GAME = "VIDEO_GAME",
    OTHER = "OTHER",
    NOVEL = "NOVEL",
    DOUJINSHI = "DOUJINSHI",
    ANIME = "ANIME"
}
declare enum MediaSort {
    ID = "id",
    ID_DESC = "id_desc",
    TITLE_ROMAJI = "title_romaji",
    TITLE_ROMAJI_DESC = "title_romaji_desc",
    TITLE_ENGLISH = "title_english",
    TITLE_ENGLISH_DESC = "title_english_desc",
    TITLE_NATIVE = "title_native",
    TITLE_NATIVE_DESC = "title_native_desc",
    TYPE = "type",
    TYPE_DESC = "type_desc",
    FORMAT = "format",
    FORMAT_DESC = "format_desc",
    START_DATE = "start_date",
    START_DATE_DESC = "start_date_desc",
    END_DATE = "end_date",
    END_DATE_DESC = "end_date_desc",
    SCORE = "score",
    SCORE_DESC = "score_desc",
    POPULARITY = "popularity",
    POPULARITY_DESC = "popularity_desc",
    TRENDING = "trending",
    TRENDING_DESC = "trending_desc",
    EPISODES = "episodes",
    EPISODES_DESC = "episodes_desc",
    DURATION = "duration",
    DURATION_DESC = "duration_desc",
    STATUS = "status",
    STATUS_DESC = "status_desc",
    UPDATED_AT = "updated_at",
    UPDATED_AT_DESC = "updated_at_desc"
}
declare enum Language {
    SUB = "sub",
    DUB = "dub",
    BOTH = "both",
    RAW = "raw"
}
declare enum AgeRating {
    G = "G",
    PG = "PG",
    R = "R",
    R18 = "R18"
}

declare class FilterDto {
    constructor(partial?: Partial<FilterDto>);
    sort?: MediaSort[];
    perPage?: number;
    page?: number;
    sourceIn?: MediaSource[];
    popularityLesser?: number;
    popularityGreater?: number;
    popularityNot?: number;
    scoreLesser?: number;
    scoreGreater?: number;
    scoreNot?: number;
    tagCategoryNotIn?: string[];
    tagCategoryIn?: string[];
    tagNotIn?: string[];
    tagIn?: string[];
    studioIn?: string[];
    characterIn?: string[];
    voiceActorIn?: string[];
    genreNotIn?: string[];
    genreIn?: string[];
    durationLesser?: number;
    durationGreater?: number;
    episodesLesser?: number;
    episodesGreater?: number;
    statusNotIn?: MediaStatus[];
    statusNot?: MediaStatus;
    statusIn?: MediaStatus[];
    formatNotIn?: MediaFormat[];
    formatNot?: MediaFormat;
    formatIn?: MediaFormat[];
    endDateLike?: string;
    endDateLesser?: string;
    endDateGreater?: string;
    startDateLike?: string;
    startDateLesser?: string;
    startDateGreater?: string;
    idMalNotIn?: number[];
    idMalIn?: number[];
    idMalNot?: number;
    idNotIn?: number[];
    idIn?: number[];
    idNot?: number;
    query?: string;
    countryOfOrigin?: string;
    isAdult?: boolean;
    nsfw?: boolean;
    isLicensed?: boolean;
    format?: MediaFormat;
    type?: MediaType;
    status?: MediaStatus;
    season?: MediaSeason;
    language?: Language;
    ageRating?: AgeRating[];
    idMal?: number;
    id?: number;
}

interface IKuroji {
    id: number;
    idMal?: number;
    title: ITitle;
    bannerImage?: string;
    status?: string;
    type?: string;
    format?: string;
    coverImage: ICover;
    updatedAt: number;
    description?: string;
    startDate: IFuzzyDate;
    endDate: IFuzzyDate;
    season?: string;
    seasonYear?: number;
    episodes?: number;
    sub?: number;
    dub?: number;
    duration?: number;
    countryOfOrigin?: string;
    isLicensed?: boolean;
    source?: string;
    hashTag?: string;
    isLocked?: boolean;
    isAdult?: boolean;
    averageScore?: number;
    meanScore?: number;
    score?: number;
    popularity?: number;
    trending?: number;
    favourites?: number;
    genres?: string[];
    synonyms?: string[];
    trailer?: ITrailer;
    studios: IStudioEdge[];
    airingSchedule: IAiringSchedule[];
    tags: ITag[];
    rankings: IRanking[];
    externalLinks: IExternalLink[];
    streamingEpisodes: IStreamingEpisode[];
    scoreDistribution: IScoreDistribution[];
    statusDistribution: IStatusDistribution[];
    shikimori: IShikimori;
    kitsu: IKitsu;
}
interface ITitle {
    romaji?: string;
    english?: string;
    native?: string;
}
interface ICover {
    color?: string;
    large?: string;
    medium?: string;
    extraLarge?: string;
}
interface IFuzzyDate {
    day?: number;
    month?: number;
    year?: number;
}
interface ITrailer {
    id: string;
    site?: string;
    thumbnail?: string;
}
interface ICharacterEdge {
    role?: string;
    character: ICharacter;
    voiceActors: IVoiceActor[];
}
interface ICharacter {
    name: IName;
    image: IImage;
}
interface IVoiceActor {
    language?: string;
    name: IName;
    image: IImage;
}
interface IName {
    full?: string;
    native?: string;
    alternative?: string[];
}
interface IImage {
    large?: string;
    medium?: string;
}
interface ITag {
    id: number;
    name?: string;
    description?: string;
    category?: string;
    rank?: number;
    isSpoiler?: boolean;
    isAdult?: boolean;
}
interface IExternalLink {
    id: number;
    url?: string;
    site?: string;
    siteId?: number;
    type?: string;
    language?: string;
    color?: string;
    icon?: string;
    notes?: string;
    isDisabled?: boolean;
}
interface IStreamingEpisode {
    title?: string;
    thumbnail?: string;
    url?: string;
    site?: string;
}
interface IStudioEdge {
    isMain?: boolean;
    stduio: IStudio;
}
interface IStudio {
    id: number;
    name?: string;
}
interface IAiringSchedule {
    id: number;
    episode?: number;
    airingAt?: number;
}
interface IRanking {
    id: number;
    rank?: number;
    type?: string;
    format?: string;
    year?: number;
    season?: string;
    allTime?: boolean;
    context?: string;
}
interface IScoreDistribution {
    score?: number;
    amount?: number;
}
interface IStatusDistribution {
    status?: string;
    amount?: number;
}
interface IBasicShikimori {
    id?: string;
    malId?: number;
    russian?: string;
    licenseNameRu?: string;
    episodes?: number;
    episodesAired?: number;
    url?: string;
    franchise?: string;
    poster?: IPoster;
}
interface IBasicKitsu {
    id?: string;
    anilistId?: number;
    titles?: IKitsuTitle;
    slug?: string;
    synopsis?: string;
    episodeCount?: number;
    episodeLength?: number;
    canonicalTitle?: string;
    averageRating?: string;
    ageRating?: string;
    ageRatingGuide?: string;
    posterImage?: IKitsuPoster;
    coverImage?: IKitsuCover;
    showType?: string;
}
interface IBasicKuroji {
    id: number;
    idMal?: number;
    title?: ITitle;
    synonyms?: string[];
    bannerImage?: string;
    coverImage?: ICover;
    type?: string;
    format?: string;
    status?: string;
    description?: string;
    moreInfo?: string;
    startDate?: IFuzzyDate;
    season?: string;
    seasonYear?: number;
    episodes?: number;
    sub?: number;
    dub?: number;
    duration?: number;
    countryOfOrigin?: string;
    popularity?: number;
    favourites?: number;
    score?: number;
    isLocked?: boolean;
    isAdult?: boolean;
    genres?: string[];
    nextAiringEpisode?: IAiringSchedule;
    shikimori?: IBasicShikimori;
    kitsu?: IBasicKitsu;
}
interface IFranchise {
    cover?: string;
    banner?: string;
    title?: string;
    franchise?: string;
    description?: string;
}
type Weekday = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
type TSchedule = {
    [key in Weekday]: IScheduleData;
};
interface IScheduleData {
    current: boolean;
    data: IBasicKuroji[];
}
interface IShikimori {
    id: string;
    idMal?: number;
    name?: string;
    russian?: string;
    licenseNameRu?: string;
    english?: string;
    japanese?: string;
    poster?: IPoster;
    synonyms: string[];
    kind?: string;
    rating?: string;
    score?: number;
    status?: string;
    episodes?: number;
    episodesAired?: number;
    duration?: number;
    airedOn: IShikimoriFuzzyDate;
    releasedOn: IShikimoriFuzzyDate;
    franchise?: string;
    url?: string;
    season?: string;
    createdAt?: string;
    updatedAt?: string;
    nextEpisodeAt?: string;
    videos: IKurojiVideo[];
    screenshots: IScreenshot[];
}
interface IPoster {
    id: number;
    originalUrl?: string;
    mainUrl?: string;
}
interface IShikimoriFuzzyDate extends IFuzzyDate {
    date?: string;
}
interface IKurojiVideo {
    id: string;
    url?: string;
    name?: string;
    kind?: string;
    playerUrl?: string;
    imageUrl?: string;
}
interface IScreenshot {
    id: string;
    originalUrl?: string;
    x166Url?: string;
    x332Url?: string;
}
interface IKitsu {
    id: string;
    anilistId?: number;
    type?: string;
    selfLink?: string;
    createdAt?: string;
    updatedAt?: string;
    slug?: string;
    synopsis?: string;
    coverImageTopOffset?: number;
    canonicalTitle?: string;
    abbreviatedTitles?: string[];
    averageRating?: string;
    userCount?: number;
    favoritesCount?: number;
    startDate?: string;
    endDate?: string;
    popularityRank?: number;
    ratingRank?: number;
    ageRating?: string;
    ageRatingGuide?: string;
    subtype?: string;
    status?: string;
    tba?: string;
    episodeCount?: number;
    episodeLength?: number;
    youtubeVideoId?: string;
    showType?: string;
    nsfw: boolean;
    titles?: IKitsuTitle;
    posterImage?: IKitsuPoster;
    coverImage?: IKitsuCover;
    genres?: IKitsuRelationship;
    categories?: IKitsuRelationship;
    castings?: IKitsuRelationship;
    installments?: IKitsuRelationship;
    mappings?: IKitsuRelationship;
    reviews?: IKitsuRelationship;
    mediaRelationships?: IKitsuRelationship;
    episodes?: IKitsuRelationship;
    streamingLinks?: IKitsuRelationship;
    animeProductions?: IKitsuRelationship;
    animeCharacters?: IKitsuRelationship;
    animeStaff?: IKitsuRelationship;
}
interface IKitsuTitle {
    en?: string;
    en_jp?: string;
    ja_jp?: string;
}
interface IKitsuImage {
    tiny?: string;
    small?: string;
    large?: string;
    original?: string;
}
interface IKitsuPoster extends IKitsuImage {
    medium?: string;
    dimensions: IKitsuPosterImageDimensions[];
}
interface IKitsuCover extends IKitsuImage {
    dimensions: IKitsuImageDimensions;
}
interface IKitsuImageDimensions {
    tiny: IKitsuDimension;
    small: IKitsuDimension;
    large: IKitsuDimension;
}
interface IKitsuPosterImageDimensions extends IKitsuImageDimensions {
    medium: IKitsuDimension;
}
interface IKitsuDimension {
    width?: number;
    height?: number;
}
interface IKitsuRelationship {
    selfLink: string;
    related: string;
}
interface IEpisode {
    title?: string;
    image?: IEpisodeImage;
    number?: number;
    overview?: string;
    date?: string;
    duration?: number;
    filler?: boolean;
    sub?: boolean;
    dub?: boolean;
}
interface IEpisodeDetails extends IEpisode {
    images: EpisodeImage[];
}
interface EpisodeImage {
    image: IEpisodeImage;
    aspectRation?: number;
    height?: number;
    width?: number;
    iso_639_1?: string;
    voteAverage?: number;
    voteCount?: number;
}
interface IEpisodeImage {
    w300: string;
    w500: string;
    original: string;
}
interface IProvider extends IEpisode {
    providers: IProviderInfo[];
}
interface IProviderInfo {
    id: string;
    filler: boolean;
    provider: EProvider;
    type: ESourceType;
}
declare enum EProvider {
    zoro = "zoro",
    animekai = "animekai",
    animepahe = "animepahe"
}
declare enum ESourceType {
    soft_sub = "soft_sub",
    hard_sub = "hard_sub",
    dub = "dub",
    both = "both"
}
interface Response$1<T> {
    pageInfo: PageInfo;
    data: T;
}
interface SearchResponse<T> extends Response$1<T> {
    franchise: FranchiseResponse;
}
interface FranchiseResponse {
    pageInfo: PageInfo;
    franchise: IFranchise;
    data: IBasicKuroji[];
}
interface PageInfo {
    total: number;
    perPage: number;
    currentPage: number;
    lastPage: number;
    hasNextPage: boolean;
}

declare class Kuroji extends MetaProvider {
    readonly name = "Kuroji";
    protected baseUrl: string;
    protected headers: {
        Accept: string;
        "Content-Type": string;
        "User-Agent": string;
    };
    setBaseUrl(url: string): void;
    getInfo(id: number): Promise<IKuroji>;
    search(q: string): Promise<SearchResponse<IBasicKuroji>>;
    getFilter(filter: FilterDto): Promise<Response$1<IBasicKuroji>>;
    getRecommendations(id: number, filter: FilterDto): Promise<Response$1<IBasicKuroji>>;
    getChronology(id: number, filter: FilterDto): Promise<Response$1<IBasicKuroji>>;
    getFranchise(franchise: string, filter: FilterDto): Promise<FranchiseResponse>;
    getCharacters(id: number, page?: number, perPage?: number): Promise<Response$1<ICharacterEdge[]>>;
    getRandom(): Promise<IKuroji>;
    getSchedule(): Promise<TSchedule>;
    getAllGenres(): Promise<string[]>;
    getAllTags(page?: number, perPage?: number): Promise<Response$1<ITag[]>>;
    getEpisodes(id: number): Promise<IEpisode[]>;
    getEpisode(id: number, ep: number): Promise<IEpisodeDetails>;
    getProviders(id: number, ep: number): Promise<IProvider>;
    getSources(id: number, ep: number, provider: EProvider): Promise<ISource>;
}

declare const _default: {
    Kuroji: typeof Kuroji;
};

declare const PROVIDERS: {
    ANIME: never[];
    META: Kuroji[];
};

export { _default$1 as ANIME, EProvider, ESourceType, type EpisodeImage, type FranchiseResponse, type IAiringSchedule, type IBasicKitsu, type IBasicKuroji, type IBasicShikimori, type ICharacter, type ICharacterEdge, type ICover, type IEpisode, type IEpisodeDetails, type IEpisodeImage, type IExternalLink, type IFranchise, type IFuzzyDate, type IImage, type IKitsu, type IKitsuCover, type IKitsuDimension, type IKitsuImage, type IKitsuImageDimensions, type IKitsuPoster, type IKitsuPosterImageDimensions, type IKitsuRelationship, type IKitsuTitle, type IKuroji, type IKurojiVideo, type IName, type IPoster, type IProvider, type IProviderInfo, type IRanking, type IScheduleData, type IScoreDistribution, type IScreenshot, type IShikimori, type IShikimoriFuzzyDate, type ISource, type IStatusDistribution, type IStreamingEpisode, type IStudio, type IStudioEdge, type ISubtitle, type ITag, type ITitle, type ITrailer, type IVideo, type IVoiceActor, type Intro, _default as META, NihoniumClient, PROVIDERS, type PageInfo, type ProxyConfig, type RequestResponse, type Response$1 as Response, type SearchResponse, type TSchedule, type Weekday, nihonium };
