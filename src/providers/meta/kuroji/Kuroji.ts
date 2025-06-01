import type { ISource } from '../../../types/provider';
import { MetaProvider } from '../../base';
import { type FilterDto, convertFilterToParams } from './types/FilterDto';
import type {
	EProvider,
	IBasicKuroji,
	IEpisode,
	IKuroji,
	IProvider,
	Response,
} from './types/types';

class Kuroji extends MetaProvider {
	override readonly name = 'Kuroji';
	protected override baseUrl = '';
	protected override headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		'User-Agent': 'nihonium client (https://github.com/Nihonium-Org/nihonium.js)',
	};

	public setBaseUrl(url: string) {
		this.baseUrl = url;
	}

	async getInfo(id: number): Promise<IKuroji> {
		const { data, error } = await this.client.get<IKuroji>(`${this.baseUrl}/api/anime/info/${id}`, {
			headers: this.headers,
		});

		if (error || !data) throw error;

		return data;
	}

	async search(q: string): Promise<Response<IBasicKuroji>> {
		const { data, error } = await this.client.get<Response<IBasicKuroji>>(
			`${this.baseUrl}/api/anime/search/${q}`,
			{
				headers: this.headers,
			}
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
			}
		);

		if (error || !data) throw error;

		return data;
	}

	async getEpisodes(id: number): Promise<IEpisode[]> {
		const { data, error } = await this.client.get<IEpisode[]>(
			`${this.baseUrl}/api/anime/info/${id}/episodes`,
			{
				headers: this.headers,
			}
		);

		if (error || !data) throw error;

		return data;
	}

	async getEpisode(id: number, ep: number): Promise<IEpisode> {
		const { data, error } = await this.client.get<IEpisode>(
			`${this.baseUrl}/api/anime/info/${id}/episodes/${ep}`,
			{
				headers: this.headers,
			}
		);

		if (error || !data) throw error;

		return data;
	}

	async getProviders(id: number): Promise<IProvider[]> {
		const { data, error } = await this.client.get<IProvider[]>(
			`${this.baseUrl}/api/anime/info/${id}/providers`,
			{
				headers: this.headers,
			}
		);

		if (error || !data) throw error;

		return data;
	}

	async getProvider(id: number, ep: number): Promise<IProvider> {
		const { data, error } = await this.client.get<IProvider>(
			`${this.baseUrl}/api/anime/info/${id}/providers/${ep}`,
			{
				headers: this.headers,
			}
		);

		if (error || !data) throw error;

		return data;
	}

	async getSources(id: number, ep: number, provider: EProvider): Promise<ISource> {
		const { data, error } = await this.client.get<ISource>(
			`${this.baseUrl}/api/anime/watch/${id}/episodes/${ep}?provider=${provider}`,
			{
				headers: this.headers,
			}
		);

		if (error || !data) throw error;

		return data;
	}
}

export default Kuroji;
