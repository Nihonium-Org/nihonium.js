import type { ISource } from "../../../types/provider";
import { MetaProvider } from "../../base";
import { type FilterDto, convertFilterToParams } from "./types/filterdto";
import type {
  EProvider,
  FranchiseResponse,
  IBasicKuroji,
  ICharacterEdge,
  IEpisode,
  IEpisodeDetails,
  IKuroji,
  IProvider,
  ITag,
  Response,
  SearchResponse,
  TSchedule,
} from "./types/types";

class Kuroji extends MetaProvider {
  override readonly name = "Kuroji";
  protected override baseUrl = "";
  protected override headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "User-Agent":
      "nihonium client (https://github.com/Nihonium-Org/nihonium.js)",
  };

  public setBaseUrl(url: string) {
    this.baseUrl = url;
  }

  async getInfo(id: number): Promise<IKuroji> {
    const { data, error } = await this.client.get<IKuroji>(
      `${this.baseUrl}/api/anime/info/${id}`,
      {
        headers: this.headers,
      },
    );

    if (error || !data) throw error;

    return data;
  }

  async search(q: string): Promise<SearchResponse<IBasicKuroji>> {
    const { data, error } = await this.client.get<SearchResponse<IBasicKuroji>>(
      `${this.baseUrl}/api/anime/search/${q}`,
      {
        headers: this.headers,
      },
    );

    if (error || !data) throw error;

    return data;
  }

  async getFilter(filter: FilterDto): Promise<Response<IBasicKuroji>> {
    const params = convertFilterToParams(filter);
    const queryString = `?${new URLSearchParams(params).toString()}`;
    const { data, error } = await this.client.get<Response<IBasicKuroji>>(
      `${this.baseUrl}/api/anime/filter${queryString}`,
      {
        headers: this.headers,
      },
    );

    if (error || !data) throw error;

    return data;
  }

  async getRecommendations(
    id: number,
    filter: FilterDto,
  ): Promise<Response<IBasicKuroji>> {
    const params = convertFilterToParams(filter);
    const queryString = `?${new URLSearchParams(params).toString()}`;
    const { data, error } = await this.client.get<Response<IBasicKuroji>>(
      `${this.baseUrl}/api/anime/info/${id}/recommendations${queryString}`,
      {
        headers: this.headers,
      },
    );

    if (error || !data) throw error;

    return data;
  }

  async getChronology(
    id: number,
    filter: FilterDto,
  ): Promise<Response<IBasicKuroji>> {
    const params = convertFilterToParams(filter);
    const queryString = `?${new URLSearchParams(params).toString()}`;
    const { data, error } = await this.client.get<Response<IBasicKuroji>>(
      `${this.baseUrl}/api/anime/info/${id}/chronology${queryString}`,
      {
        headers: this.headers,
      },
    );

    if (error || !data) throw error;

    return data;
  }

  async getFranchise(
    franchise: string,
    filter: FilterDto,
  ): Promise<FranchiseResponse> {
    const params = convertFilterToParams(filter);
    const queryString = `?${new URLSearchParams(params).toString()}`;
    const { data, error } = await this.client.get<Promise<FranchiseResponse>>(
      `${this.baseUrl}/api/anime/franchise/${franchise}${queryString}`,
      {
        headers: this.headers,
      },
    );

    if (error || !data) throw error;

    return data;
  }

  async getCharacters(
    id: number,
    page = 1,
    perPage = 25,
  ): Promise<Response<ICharacterEdge[]>> {
    const { data, error } = await this.client.get<Response<ICharacterEdge[]>>(
      `${this.baseUrl}/api/anime/info/${id}/characters?page=${page}&perPage=${perPage}`,
      {
        headers: this.headers,
      },
    );

    if (error || !data) throw error;

    return data;
  }

  async getRandom(): Promise<IKuroji> {
    const { data, error } = await this.client.get<IKuroji>(
      `${this.baseUrl}/api/anime/random`,
      {
        headers: this.headers,
      },
    );

    if (error || !data) throw error;

    return data;
  }

  async getSchedule(): Promise<TSchedule> {
    const { data, error } = await this.client.get<TSchedule>(
      `${this.baseUrl}/api/anime/schedule`,
      {
        headers: this.headers,
      },
    );

    if (error || !data) throw error;

    return data;
  }

  async getAllGenres(): Promise<string[]> {
    const { data, error } = await this.client.get<string[]>(
      `${this.baseUrl}/api/anime/genres`,
      {
        headers: this.headers,
      },
    );

    if (error || !data) throw error;

    return data;
  }

  async getAllTags(page = 1, perPage = 25): Promise<Response<ITag[]>> {
    const { data, error } = await this.client.get<Response<ITag[]>>(
      `${this.baseUrl}/api/anime/tags?page=${page}&perPage=${perPage}`,
      {
        headers: this.headers,
      },
    );

    if (error || !data) throw error;

    return data;
  }

  async getEpisodes(id: number): Promise<IEpisode[]> {
    const { data, error } = await this.client.get<IEpisode[]>(
      `${this.baseUrl}/api/anime/info/${id}/episodes`,
      {
        headers: this.headers,
      },
    );

    if (error || !data) throw error;

    return data;
  }

  async getEpisode(id: number, ep: number): Promise<IEpisodeDetails> {
    const { data, error } = await this.client.get<IEpisodeDetails>(
      `${this.baseUrl}/api/anime/info/${id}/episodes/${ep}`,
      {
        headers: this.headers,
      },
    );

    if (error || !data) throw error;

    return data;
  }

  async getProviders(id: number, ep: number): Promise<IProvider> {
    const { data, error } = await this.client.get<IProvider>(
      `${this.baseUrl}/api/anime/info/${id}/providers/${ep}`,
      {
        headers: this.headers,
      },
    );

    if (error || !data) throw error;

    return data;
  }

  async getSources(
    id: number,
    ep: number,
    provider: EProvider,
  ): Promise<ISource> {
    const { data, error } = await this.client.get<ISource>(
      `${this.baseUrl}/api/anime/watch/${id}/episodes/${ep}?provider=${provider}`,
      {
        headers: this.headers,
      },
    );

    if (error || !data) throw error;

    return data;
  }
}

export default Kuroji;
