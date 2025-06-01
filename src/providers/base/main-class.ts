import { NihoniumClient, type ProxyConfig } from '../../helpers';

export class BaseProvider {
	protected client: NihoniumClient;
	protected proxyConfig?: ProxyConfig;
	protected baseUrl?: string;

	constructor(baseUrl?: string, proxyConfig?: ProxyConfig) {
		this.baseUrl = baseUrl;
		this.proxyConfig = proxyConfig;
		this.client = new NihoniumClient(baseUrl, proxyConfig);
	}
}
