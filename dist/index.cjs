"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  ANIME: () => anime_default,
  EProvider: () => EProvider,
  ESourceType: () => ESourceType,
  META: () => meta_default,
  NihoniumClient: () => NihoniumClient,
  PROVIDERS: () => PROVIDERS,
  nihonium: () => nihonium
});
module.exports = __toCommonJS(index_exports);

// src/providers/anime/index.ts
var anime_default = {};

// src/helpers/request.ts
var import_ky = __toESM(require("ky"), 1);
var userAgents = [
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/37.0.2062.94 Chrome/37.0.2062.94 Safari/537.36",
  "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36",
  "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko",
  "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.0",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/600.8.9 (KHTML, like Gecko) Version/8.0.8 Safari/600.8.9",
  "Mozilla/5.0 (iPad; CPU OS 8_4_1 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12H321 Safari/600.1.4",
  "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10240",
  "Mozilla/5.0 (Windows NT 6.3; WOW64; rv:40.0) Gecko/20100101 Firefox/40.0",
  "Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko",
  "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36",
  "Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0) like Gecko",
  "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:40.0) Gecko/20100101 Firefox/40.0",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/600.7.12 (KHTML, like Gecko) Version/8.0.7 Safari/600.7.12",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:40.0) Gecko/20100101 Firefox/40.0",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/600.8.9 (KHTML, like Gecko) Version/7.1.8 Safari/537.85.17",
  "Mozilla/5.0 (iPad; CPU OS 8_4 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12H143 Safari/600.1.4",
  "Mozilla/5.0 (iPad; CPU OS 8_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12F69 Safari/600.1.4"
];
var getRandomUserAgent = () => {
  return userAgents[Math.floor(Math.random() * userAgents.length)];
};
var NihoniumClient = class {
  client;
  baseUrl;
  rateLimitInfo = {
    remaining: Number.POSITIVE_INFINITY,
    reset: 0,
    retryAfter: 60
  };
  proxyConfig;
  proxyUrls = [];
  currentProxyIndex = 0;
  rotationInterval;
  validUrl = /^https?:\/\/.+/;
  /**
   * Creates a new instance of the NihoniumClient.
   * @param {string} [baseUrl] - The base URL for the requests.
   * @param {ProxyConfig} [proxyConfig] - The proxy configuration.
   */
  constructor(baseUrl, proxyConfig) {
    this.baseUrl = baseUrl;
    this.client = import_ky.default.create({
      prefixUrl: baseUrl,
      hooks: {
        beforeRequest: [
          (request) => {
            request.headers.set("User-Agent", getRandomUserAgent());
            request.headers.set("x-requested-with", "XMLHttpRequest");
            if (this.proxyConfig?.key) {
              request.headers.set("x-api-key", this.proxyConfig.key);
            }
            if (request.url.includes("kuroji")) {
              request.headers.set(
                "User-Agent",
                "nihonium client (https://github.com/Nihonium-Org/nihonium.js)"
              );
            }
          }
        ],
        afterResponse: [
          async (_request, _options, response) => {
            await this.handleRateLimit(response);
          }
        ],
        beforeRetry: [
          async ({ error }) => {
            if (error instanceof import_ky.HTTPError && error.response.status === 429) {
              const delay = this.rateLimitInfo.retryAfter * 1e3;
              await new Promise((resolve) => setTimeout(resolve, delay));
            }
          }
        ]
      },
      retry: {
        limit: 2,
        methods: ["get", "post", "put", "delete", "patch"]
      }
    });
    if (proxyConfig) {
      this.setProxy(proxyConfig);
    }
  }
  /**
   * Set or change the proxy configuration.
   * @param {ProxyConfig} proxyConfig - The proxy configuration.
   */
  setProxy(proxyConfig) {
    if (!proxyConfig?.url) return;
    if (typeof proxyConfig.url === "string") {
      if (!this.validUrl.test(proxyConfig.url)) {
        throw new Error("Proxy URL is invalid!");
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
  setupProxyRotation(proxyConfig) {
    if (this.rotationInterval) {
      clearInterval(this.rotationInterval);
    }
    if (this.proxyUrls.length > 1) {
      const interval = proxyConfig.rotateInterval ?? 5e3;
      this.rotationInterval = setInterval(() => {
        this.currentProxyIndex = (this.currentProxyIndex + 1) % this.proxyUrls.length;
      }, interval);
    }
  }
  /**
   * Get the current proxy URL.
   * @returns {string | null} The current proxy URL or null if no proxy is configured.
   */
  getCurrentProxyUrl() {
    if (this.proxyUrls.length === 0) return null;
    return this.proxyUrls[this.currentProxyIndex];
  }
  /**
   * Handles rate limit information from the response headers.
   * @param {Response} response - The response from the request.
   * @returns {Promise<void>} - A promise that resolves when the rate limit information has been handled.
   */
  async handleRateLimit(response) {
    const remaining = Number.parseInt(response.headers.get("x-ratelimit-remaining") || "Infinity");
    const reset = Number.parseInt(response.headers.get("x-ratelimit-reset") || "0");
    const retryAfter = Number.parseInt(response.headers.get("retry-after") || "60");
    this.rateLimitInfo = {
      remaining,
      reset,
      retryAfter
    };
  }
  /**
   * Transforms the URL to go through proxy if configured.
   * @param {string} url - The original URL.
   * @returns {string} The transformed URL.
   */
  transformUrlForProxy(url) {
    if (!this.proxyConfig) return url;
    const proxyUrl = this.getCurrentProxyUrl();
    if (!proxyUrl) return url;
    if (url.startsWith("http://") || url.startsWith("https://")) {
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
  async handleRequest(method, url, options) {
    const response = {
      data: null,
      error: null,
      isHTTPError: false,
      isOnRateLimit: false,
      isLoading: true,
      isFetching: true,
      isPending: true,
      isFetched: false,
      isLoaded: false,
      response: null
    };
    try {
      if (this.rateLimitInfo.remaining <= 0) {
        response.isOnRateLimit = true;
        const now = Math.floor(Date.now() / 1e3);
        const waitTime = Math.max(this.rateLimitInfo.reset - now, 0);
        await new Promise((resolve) => setTimeout(resolve, waitTime * 1e3));
      }
      const transformedUrl = this.transformUrlForProxy(url);
      const apiResponse = await this.client(transformedUrl, {
        method,
        ...options,
        headers: {
          ...options?.headers
        }
      });
      if (options?.manualParse) {
        response.response = apiResponse;
        response.isFetched = true;
        response.isLoaded = true;
      } else {
        const contentType = apiResponse.headers.get("content-type") || "";
        response.data = contentType.includes("application/json") ? await apiResponse.json() : await apiResponse.text();
        response.isFetched = true;
        response.isLoaded = true;
      }
    } catch (error) {
      if (error instanceof import_ky.HTTPError) {
        const errorBody = await error.response.text().catch(() => "");
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
        response.error = error;
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
  async get(url, options) {
    return this.handleRequest("get", url, options);
  }
  /**
   * Makes a POST request.
   * @param {string} url - The URL for the request.
   * @param {KyOptions & { manualParse?: boolean }} [options] - Additional options for the request.
   * @returns {Promise<RequestResponse<T>>} - A promise that resolves to the response of the request.
   */
  async post(url, options) {
    return this.handleRequest("post", url, options);
  }
  /**
   * Makes a PUT request.
   * @param {string} url - The URL for the request.
   * @param {KyOptions & { manualParse?: boolean }} [options] - Additional options for the request.
   * @returns {Promise<RequestResponse<T>>} - A promise that resolves to the response of the request.
   */
  async put(url, options) {
    return this.handleRequest("put", url, options);
  }
  /**
   * Makes a DELETE request.
   * @param {string} url - The URL for the request.
   * @param {KyOptions & { manualParse?: boolean }} [options] - Additional options for the request.
   * @returns {Promise<RequestResponse<T>>} - A promise that resolves to the response of the request.
   */
  async delete(url, options) {
    return this.handleRequest("delete", url, options);
  }
  /**
   * Makes a PATCH request.
   * @param {string} url - The URL for the request.
   * @param {KyOptions & { manualParse?: boolean }} [options] - Additional options for the request.
   * @returns {Promise<RequestResponse<T>>} - A promise that resolves to the response of the request.
   */
  async patch(url, options) {
    return this.handleRequest("patch", url, options);
  }
  /**
   * Cleanup method to clear intervals when the client is no longer needed.
   */
  destroy() {
    if (this.rotationInterval) {
      clearInterval(this.rotationInterval);
    }
  }
};
var nihonium = new NihoniumClient();

// src/providers/base/main-class.ts
var BaseProvider = class {
  client;
  proxyConfig;
  baseUrl;
  constructor(baseUrl, proxyConfig) {
    this.baseUrl = baseUrl;
    this.proxyConfig = proxyConfig;
    this.client = new NihoniumClient(baseUrl, proxyConfig);
  }
};

// src/providers/base/meta/index.ts
var MetaProvider = class extends BaseProvider {
};

// src/providers/meta/kuroji/types/filterdto.ts
function convertFilterToParams(filter) {
  const params = {};
  for (const [key, value] of Object.entries(filter)) {
    if (value === void 0 || value === null) continue;
    if (Array.isArray(value)) {
      if (value.length > 0) {
        params[key] = value.join(",");
      }
    } else if (typeof value === "boolean") {
      params[key] = value.toString();
    } else if (typeof value === "number" || typeof value === "string") {
      params[key] = value.toString();
    }
  }
  return params;
}

// src/providers/meta/kuroji/kuroji.ts
var Kuroji = class extends MetaProvider {
  name = "Kuroji";
  baseUrl = "";
  headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "User-Agent": "nihonium client (https://github.com/Nihonium-Org/nihonium.js)"
  };
  setBaseUrl(url) {
    this.baseUrl = url;
  }
  async getInfo(id) {
    const { data, error } = await this.client.get(
      `${this.baseUrl}/api/anime/info/${id}`,
      {
        headers: this.headers
      }
    );
    if (error || !data) throw error;
    return data;
  }
  async search(q) {
    const { data, error } = await this.client.get(
      `${this.baseUrl}/api/anime/search/${q}`,
      {
        headers: this.headers
      }
    );
    if (error || !data) throw error;
    return data;
  }
  async getFilter(filter) {
    const params = convertFilterToParams(filter);
    const queryString = `?${new URLSearchParams(params).toString()}`;
    const { data, error } = await this.client.get(
      `${this.baseUrl}/api/anime/filter${queryString}`,
      {
        headers: this.headers
      }
    );
    if (error || !data) throw error;
    return data;
  }
  async getRecommendations(id, filter) {
    const params = convertFilterToParams(filter);
    const queryString = `?${new URLSearchParams(params).toString()}`;
    const { data, error } = await this.client.get(
      `${this.baseUrl}/api/anime/info/${id}/recommendations${queryString}`,
      {
        headers: this.headers
      }
    );
    if (error || !data) throw error;
    return data;
  }
  async getChronology(id, filter) {
    const params = convertFilterToParams(filter);
    const queryString = `?${new URLSearchParams(params).toString()}`;
    const { data, error } = await this.client.get(
      `${this.baseUrl}/api/anime/info/${id}/chronology${queryString}`,
      {
        headers: this.headers
      }
    );
    if (error || !data) throw error;
    return data;
  }
  async getFranchise(franchise, filter) {
    const params = convertFilterToParams(filter);
    const queryString = `?${new URLSearchParams(params).toString()}`;
    const { data, error } = await this.client.get(
      `${this.baseUrl}/api/anime/franchise/${franchise}${queryString}`,
      {
        headers: this.headers
      }
    );
    if (error || !data) throw error;
    return data;
  }
  async getCharacters(id, page = 1, perPage = 25) {
    const { data, error } = await this.client.get(
      `${this.baseUrl}/api/anime/info/${id}/characters?page=${page}&perPage=${perPage}`,
      {
        headers: this.headers
      }
    );
    if (error || !data) throw error;
    return data;
  }
  async getRandom() {
    const { data, error } = await this.client.get(
      `${this.baseUrl}/api/anime/random`,
      {
        headers: this.headers
      }
    );
    if (error || !data) throw error;
    return data;
  }
  async getSchedule() {
    const { data, error } = await this.client.get(
      `${this.baseUrl}/api/anime/schedule`,
      {
        headers: this.headers
      }
    );
    if (error || !data) throw error;
    return data;
  }
  async getAllGenres() {
    const { data, error } = await this.client.get(
      `${this.baseUrl}/api/anime/genres`,
      {
        headers: this.headers
      }
    );
    if (error || !data) throw error;
    return data;
  }
  async getAllTags(page = 1, perPage = 25) {
    const { data, error } = await this.client.get(
      `${this.baseUrl}/api/anime/tags?page=${page}&perPage=${perPage}`,
      {
        headers: this.headers
      }
    );
    if (error || !data) throw error;
    return data;
  }
  async getEpisodes(id) {
    const { data, error } = await this.client.get(
      `${this.baseUrl}/api/anime/info/${id}/episodes`,
      {
        headers: this.headers
      }
    );
    if (error || !data) throw error;
    return data;
  }
  async getEpisode(id, ep) {
    const { data, error } = await this.client.get(
      `${this.baseUrl}/api/anime/info/${id}/episodes/${ep}`,
      {
        headers: this.headers
      }
    );
    if (error || !data) throw error;
    return data;
  }
  async getProviders(id, ep) {
    const { data, error } = await this.client.get(
      `${this.baseUrl}/api/anime/info/${id}/providers/${ep}`,
      {
        headers: this.headers
      }
    );
    if (error || !data) throw error;
    return data;
  }
  async getSources(id, ep, provider) {
    const { data, error } = await this.client.get(
      `${this.baseUrl}/api/anime/watch/${id}/episodes/${ep}?provider=${provider}`,
      {
        headers: this.headers
      }
    );
    if (error || !data) throw error;
    return data;
  }
};
var kuroji_default = Kuroji;

// src/providers/meta/index.ts
var meta_default = {
  Kuroji: kuroji_default
};

// src/providers/meta/kuroji/types/types.ts
var EProvider = /* @__PURE__ */ ((EProvider2) => {
  EProvider2["zoro"] = "zoro";
  EProvider2["animekai"] = "animekai";
  EProvider2["animepahe"] = "animepahe";
  return EProvider2;
})(EProvider || {});
var ESourceType = /* @__PURE__ */ ((ESourceType2) => {
  ESourceType2["soft_sub"] = "soft_sub";
  ESourceType2["hard_sub"] = "hard_sub";
  ESourceType2["dub"] = "dub";
  ESourceType2["both"] = "both";
  return ESourceType2;
})(ESourceType || {});

// src/utils/providers.ts
var PROVIDERS = {
  ANIME: [],
  META: [new meta_default.Kuroji()]
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ANIME,
  EProvider,
  ESourceType,
  META,
  NihoniumClient,
  PROVIDERS,
  nihonium
});
//# sourceMappingURL=index.cjs.map