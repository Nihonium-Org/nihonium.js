import ky, { HTTPError, type Options as KyOptions } from 'ky';

/**
 * Represents rate limit information.
 * @property {number} remaining - The number of requests remaining before hitting the rate limit.
 * @property {number} reset - The Unix timestamp when the rate limit resets.
 * @property {number} retryAfter - The number of seconds to wait before retrying a request.
 */
interface RateLimitInfo {
	remaining: number;
	reset: number;
	retryAfter: number;
}

/**
 * Represents proxy configuration.
 * @property {string | string[]} url - The proxy URL or array of URLs for rotation.
 * @property {string} [key] - X-API-Key header value (if any).
 * @property {number} [rotateInterval] - The proxy rotation interval in milliseconds. (default: 5000)
 */
export interface ProxyConfig {
	url: string | string[];
	key?: string;
	rotateInterval?: number;
}

/**
 * A list of user agents to use for requests.
 */
const userAgents = [
	'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/37.0.2062.94 Chrome/37.0.2062.94 Safari/537.36',
	'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36',
	'Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko',
	'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.0',
	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/600.8.9 (KHTML, like Gecko) Version/8.0.8 Safari/600.8.9',
	'Mozilla/5.0 (iPad; CPU OS 8_4_1 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12H321 Safari/600.1.4',
	'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36',
	'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36',
	'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10240',
	'Mozilla/5.0 (Windows NT 6.3; WOW64; rv:40.0) Gecko/20100101 Firefox/40.0',
	'Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko',
	'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36',
	'Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0) like Gecko',
	'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:40.0) Gecko/20100101 Firefox/40.0',
	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/600.7.12 (KHTML, like Gecko) Version/8.0.7 Safari/600.7.12',
	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36',
	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:40.0) Gecko/20100101 Firefox/40.0',
	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/600.8.9 (KHTML, like Gecko) Version/7.1.8 Safari/537.85.17',
	'Mozilla/5.0 (iPad; CPU OS 8_4 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12H143 Safari/600.1.4',
	'Mozilla/5.0 (iPad; CPU OS 8_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12F69 Safari/600.1.4',
];

/**
 * Gets a random user agent from the list.
 * @returns {string} A random user agent string.
 */
const getRandomUserAgent = () => {
	return userAgents[Math.floor(Math.random() * userAgents.length)];
};

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
export interface RequestResponse<T> {
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
export class NihoniumClient {
	private client: typeof ky;
	private baseUrl?: string;
	private rateLimitInfo: RateLimitInfo = {
		remaining: Number.POSITIVE_INFINITY,
		reset: 0,
		retryAfter: 60,
	};
	private proxyConfig?: ProxyConfig;
	private proxyUrls: string[] = [];
	private currentProxyIndex = 0;
	private rotationInterval?: Timer;
	private validUrl = /^https?:\/\/.+/;

	/**
	 * Creates a new instance of the NihoniumClient.
	 * @param {string} [baseUrl] - The base URL for the requests.
	 * @param {ProxyConfig} [proxyConfig] - The proxy configuration.
	 */
	constructor(baseUrl?: string, proxyConfig?: ProxyConfig) {
		this.baseUrl = baseUrl;
		this.client = ky.create({
			prefixUrl: baseUrl,
			hooks: {
				beforeRequest: [
					(request) => {
						request.headers.set('User-Agent', getRandomUserAgent());
						request.headers.set('x-requested-with', 'XMLHttpRequest');

						if (this.proxyConfig?.key) {
							request.headers.set('x-api-key', this.proxyConfig.key);
						}

						if (request.url.includes('kuroji')) {
							request.headers.set(
								'User-Agent',
								'nihonium client (https://github.com/Nihonium-Org/nihonium.js)'
							);
						}
					},
				],
				afterResponse: [
					async (_request, _options, response) => {
						await this.handleRateLimit(response);
					},
				],
				beforeRetry: [
					async ({ error }) => {
						if (error instanceof HTTPError && error.response.status === 429) {
							const delay = this.rateLimitInfo.retryAfter * 1000;
							await new Promise((resolve) => setTimeout(resolve, delay));
						}
					},
				],
			},
			retry: {
				limit: 2,
				methods: ['get', 'post', 'put', 'delete', 'patch'],
			},
		});

		if (proxyConfig) {
			this.setProxy(proxyConfig);
		}
	}

	/**
	 * Set or change the proxy configuration.
	 * @param {ProxyConfig} proxyConfig - The proxy configuration.
	 */
	setProxy(proxyConfig: ProxyConfig): void {
		if (!proxyConfig?.url) return;

		if (typeof proxyConfig.url === 'string') {
			if (!this.validUrl.test(proxyConfig.url)) {
				throw new Error('Proxy URL is invalid!');
			}
			this.proxyUrls = [proxyConfig.url];
		} else if (Array.isArray(proxyConfig.url)) {
			for (const [i, url] of proxyConfig.url.entries()) {
				if (!this.validUrl.test(url)) {
					throw new Error(`Proxy URL at index ${i} is invalid!`);
				}
			}
			this.proxyUrls = [...proxyConfig.url];
			this.setupProxyRotation(proxyConfig);
		}

		this.proxyConfig = proxyConfig;
		this.currentProxyIndex = 0;
	}

	/**
	 * Setup proxy rotation for multiple URLs.
	 * @param {ProxyConfig} proxyConfig - The proxy configuration.
	 */
	private setupProxyRotation(proxyConfig: ProxyConfig): void {
		if (this.rotationInterval) {
			clearInterval(this.rotationInterval);
		}

		if (this.proxyUrls.length > 1) {
			const interval = proxyConfig.rotateInterval ?? 5000;
			this.rotationInterval = setInterval(() => {
				this.currentProxyIndex = (this.currentProxyIndex + 1) % this.proxyUrls.length;
			}, interval);
		}
	}

	/**
	 * Get the current proxy URL.
	 * @returns {string | null} The current proxy URL or null if no proxy is configured.
	 */
	private getCurrentProxyUrl(): string | null {
		if (this.proxyUrls.length === 0) return null;
		return this.proxyUrls[this.currentProxyIndex];
	}

	/**
	 * Handles rate limit information from the response headers.
	 * @param {Response} response - The response from the request.
	 * @returns {Promise<void>} - A promise that resolves when the rate limit information has been handled.
	 */
	private async handleRateLimit(response: Response): Promise<void> {
		const remaining = Number.parseInt(response.headers.get('x-ratelimit-remaining') || 'Infinity');
		const reset = Number.parseInt(response.headers.get('x-ratelimit-reset') || '0');
		const retryAfter = Number.parseInt(response.headers.get('retry-after') || '60');

		this.rateLimitInfo = {
			remaining,
			reset,
			retryAfter,
		};
	}

	/**
	 * Transforms the URL to go through proxy if configured.
	 * @param {string} url - The original URL.
	 * @returns {string} The transformed URL.
	 */
	private transformUrlForProxy(url: string): string {
		if (!this.proxyConfig) return url;

		const proxyUrl = this.getCurrentProxyUrl();
		if (!proxyUrl) return url;

		if (url.startsWith('http://') || url.startsWith('https://')) {
			return `${proxyUrl}${url}`;
		}

		if (this.baseUrl) {
			const fullUrl = new URL(url, this.baseUrl).toString();
			return `${proxyUrl}${fullUrl}`;
		}

		return `${proxyUrl}${url}`;
	}

	/**
	 * Handles a request and returns the response.
	 * @param {string} method - The HTTP method to use for the request.
	 * @param {string} url - The URL for the request.
	 * @param {KyOptions & { manualParse?: boolean }} [options] - Additional options for the request.
	 * @returns {Promise<RequestResponse<T>>} - A promise that resolves to the response of the request.
	 */
	private async handleRequest<T>(
		method: string,
		url: string,
		options?: KyOptions & { manualParse?: boolean }
	): Promise<RequestResponse<T>> {
		const response: RequestResponse<T> = {
			data: null,
			error: null,
			isHTTPError: false,
			isOnRateLimit: false,
			isLoading: true,
			isFetching: true,
			isPending: true,
			isFetched: false,
			isLoaded: false,
			response: null,
		};

		try {
			if (this.rateLimitInfo.remaining <= 0) {
				response.isOnRateLimit = true;
				const now = Math.floor(Date.now() / 1000);
				const waitTime = Math.max(this.rateLimitInfo.reset - now, 0);
				await new Promise((resolve) => setTimeout(resolve, waitTime * 1000));
			}

			const transformedUrl = this.transformUrlForProxy(url);

			const apiResponse = await this.client(transformedUrl, {
				method,
				...options,
				headers: {
					...options?.headers,
				},
			});

			if (options?.manualParse) {
				response.response = apiResponse;
				response.isFetched = true;
				response.isLoaded = true;
			} else {
				const contentType = apiResponse.headers.get('content-type') || '';
				response.data = contentType.includes('application/json')
					? await apiResponse.json()
					: ((await apiResponse.text()) as T);

				response.isFetched = true;
				response.isLoaded = true;
			}
		} catch (error) {
			if (error instanceof HTTPError) {
				const errorBody = await error.response.text().catch(() => '');
				let errorMessage = `HTTP ${error.response.status}`;

				try {
					const jsonError = JSON.parse(errorBody);
					errorMessage += `: ${jsonError.message || error.message}`;
				} catch {
					errorMessage += errorBody ? `: ${errorBody}` : `: ${error.message}`;
				}

				response.error = new Error(errorMessage);
				response.isHTTPError = true;
			} else {
				response.error = error as Error;
			}
		} finally {
			response.isLoading = false;
			response.isFetching = false;
			response.isPending = false;
		}

		return response;
	}

	/**
	 * Makes a GET request.
	 * @param {string} url - The URL for the request.
	 * @param {KyOptions & { manualParse?: boolean }} [options] - Additional options for the request.
	 * @returns {Promise<RequestResponse<T>>} - A promise that resolves to the response of the request.
	 */
	async get<T>(
		url: string,
		options?: KyOptions & { manualParse?: boolean }
	): Promise<RequestResponse<T>> {
		return this.handleRequest<T>('get', url, options);
	}

	/**
	 * Makes a POST request.
	 * @param {string} url - The URL for the request.
	 * @param {KyOptions & { manualParse?: boolean }} [options] - Additional options for the request.
	 * @returns {Promise<RequestResponse<T>>} - A promise that resolves to the response of the request.
	 */
	async post<T>(
		url: string,
		options?: KyOptions & { manualParse?: boolean }
	): Promise<RequestResponse<T>> {
		return this.handleRequest<T>('post', url, options);
	}

	/**
	 * Makes a PUT request.
	 * @param {string} url - The URL for the request.
	 * @param {KyOptions & { manualParse?: boolean }} [options] - Additional options for the request.
	 * @returns {Promise<RequestResponse<T>>} - A promise that resolves to the response of the request.
	 */
	async put<T>(
		url: string,
		options?: KyOptions & { manualParse?: boolean }
	): Promise<RequestResponse<T>> {
		return this.handleRequest<T>('put', url, options);
	}

	/**
	 * Makes a DELETE request.
	 * @param {string} url - The URL for the request.
	 * @param {KyOptions & { manualParse?: boolean }} [options] - Additional options for the request.
	 * @returns {Promise<RequestResponse<T>>} - A promise that resolves to the response of the request.
	 */
	async delete<T>(
		url: string,
		options?: KyOptions & { manualParse?: boolean }
	): Promise<RequestResponse<T>> {
		return this.handleRequest<T>('delete', url, options);
	}

	/**
	 * Makes a PATCH request.
	 * @param {string} url - The URL for the request.
	 * @param {KyOptions & { manualParse?: boolean }} [options] - Additional options for the request.
	 * @returns {Promise<RequestResponse<T>>} - A promise that resolves to the response of the request.
	 */
	async patch<T>(
		url: string,
		options?: KyOptions & { manualParse?: boolean }
	): Promise<RequestResponse<T>> {
		return this.handleRequest<T>('patch', url, options);
	}

	/**
	 * Cleanup method to clear intervals when the client is no longer needed.
	 */
	destroy(): void {
		if (this.rotationInterval) {
			clearInterval(this.rotationInterval);
		}
	}
}

/**
 * Creates a new instance of the NihoniumClient with a default base URL.
 */
export const nihonium = new NihoniumClient();
