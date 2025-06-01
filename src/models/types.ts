export interface ProxyConfig {
  /**
   * The proxy URL
   * @example https://proxy.com
   **/
  url: string | string[]
  /**
   * X-API-Key header value (if any)
   **/
  key?: string
  /**
   * The proxy rotation interval in milliseconds. (default: 5000)
   */
  rotateInterval?: number
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