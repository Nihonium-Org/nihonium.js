import { Provider } from '../../../models'
import type { ISource } from '../../../models/types'
import { convertFilterToParams, type FilterDto } from './types/FilterDto'
import type { Response, EProvider, IBasicKuroji, IEpisode, IKuroji, IProvider, SearchResponse, ICharacterEdge, TSchedule, FranchiseResponse, ITag } from './types/types'

class Kuroji extends Provider {
  override readonly name = 'Kuroji';
  protected override baseUrl = '';

  public setBaseUrl(url: string) {
    this.baseUrl = url;
  }

  async getInfo(id: number): Promise<IKuroji> {
    try {
      const response = await this.client.get(`${this.baseUrl}/api/anime/info/${id}`, {
        headers: this.Headers(),
      });

      return response.data;
    } catch (err: any) {
      throw new Error(err)
    }
  }

  async search(q: string): Promise<SearchResponse<IBasicKuroji>> {
    try {
      const response = await this.client.get(`${this.baseUrl}/api/anime/search/${q}`, {
        headers: this.Headers(),
      })

      return response.data
    } catch (err: any) {
      throw new Error(err)
    }
  }

  async getFilter(filter: FilterDto): Promise<Response<IBasicKuroji>> {
    try {
      const params = convertFilterToParams(filter);
      const queryString = '?' + new URLSearchParams(params).toString();
      const response = await this.client.get(`${this.baseUrl}/api/anime/filter${queryString}`, {
        headers: this.Headers(),
      });

      return response.data;
    } catch (err: any) {
      throw new Error(err)
    }
  }

  async getRecommendations(id: number, filter: FilterDto): Promise<Response<IBasicKuroji>> {
    try {
      const params = convertFilterToParams(filter)
      const queryString = '?' + new URLSearchParams(params).toString()
      const response = await this.client.get(`${this.baseUrl}/api/anime/info/${id}/recommendations${queryString}`, {
        headers: this.Headers(),
      })

      return response.data
    } catch (err: any) {
      throw new Error(err)
    }
  }

  async getChronology(id: number, filter: FilterDto): Promise<Response<IBasicKuroji>> {
    try {
      const params = convertFilterToParams(filter)
      const queryString = '?' + new URLSearchParams(params).toString()
      const response = await this.client.get(`${this.baseUrl}/api/anime/info/${id}/chronology${queryString}`, {
        headers: this.Headers(),
      })

      return response.data
    } catch (err: any) {
      throw new Error(err)
    }
  }

  async getFranchise(franchise: string, filter: FilterDto): Promise<FranchiseResponse> {
    try {
      const params = convertFilterToParams(filter)
      const queryString = '?' + new URLSearchParams(params).toString()
      const response = await this.client.get(`${this.baseUrl}/api/anime/franchise/${franchise}${queryString}`, {
        headers: this.Headers(),
      })

      return response.data
    } catch (err: any) {
      throw new Error(err)
    }
  }

  async getCharacters(id: number, page: number = 1, perPage: number = 25): Promise<Response<ICharacterEdge[]>> {
    try {
      const response = await this.client.get(`${this.baseUrl}/api/anime/info/${id}/characters?page=${page}&perPage=${perPage}`, {
        headers: this.Headers(),
      })

      return response.data
    } catch (err: any) {
      throw new Error(err)
    }
  }

  async getRandom(): Promise<IKuroji> {
    try {
      const response = await this.client.get(`${this.baseUrl}/api/anime/random`, {
        headers: this.Headers(),
      })

      return response.data
    } catch (err: any) {
      throw new Error(err)
    }
  }

  async getSchedule(): Promise<TSchedule> {
    try {
      const response = await this.client.get(`${this.baseUrl}/api/anime/schedule`, {
        headers: this.Headers(),
      })

      return response.data
    } catch (err: any) {
      throw new Error(err)
    }
  }

  async getAllGenres(): Promise<string[]> {
    try {
      const response = await this.client.get(`${this.baseUrl}/api/anime/genres`, {
        headers: this.Headers(),
      })

      return response.data
    } catch (err: any) {
      throw new Error(err)
    }
  }

  async getAllTags(page: number = 1, perPage: number = 25): Promise<Response<ITag[]>> {
    try {
      const response = await this.client.get(`${this.baseUrl}/api/anime/tags?page=${page}&perPage=${perPage}`, {
        headers: this.Headers(),
      })

      return response.data
    } catch (err: any) {
      throw new Error(err)
    }
  }

  async getEpisodes(id: number): Promise<IEpisode[]> {
    try {
      const response = await this.client.get(`${this.baseUrl}/api/anime/info/${id}/episodes`, {
        headers: this.Headers(),
      })

      return response.data
    } catch (err: any) {
      throw new Error(err)
    }
  }

  async getEpisode(id: number, ep: number): Promise<IEpisode> {
    try {
      const response = await this.client.get(`${this.baseUrl}/api/anime/info/${id}/episodes/${ep}`, {
        headers: this.Headers(),
      })

      return response.data
    } catch (err: any) {
      throw new Error(err)
    }
  }

  async getProviders(id: number): Promise<IProvider[]> {
    try {
      const response = await this.client.get(`${this.baseUrl}/api/anime/info/${id}/providers`, {
        headers: this.Headers(),
      })

      return response.data
    } catch (err: any) {
      throw new Error(err)
    }
  }

  async getProvider(id: number, ep: number): Promise<IProvider> {
    try {
      const response = await this.client.get(`${this.baseUrl}/api/anime/info/${id}/providers/${ep}`, {
        headers: this.Headers(),
      })

      return response.data
    } catch (err: any) {
      throw new Error(err)
    }
  }

  async getSources(id: number, ep: number, provider: EProvider): Promise<ISource> {
    try {
      const response = await this.client.get(`${this.baseUrl}/api/anime/watch/${id}/episodes/${ep}?provider=${provider}`, {
        headers: this.Headers(),
      })

      return response.data
    } catch (err: any) {
      throw new Error(err)
    }
  }

  private Headers() {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
  }
}

export default Kuroji;