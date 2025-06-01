import { BaseProvider } from '../main-class';

export abstract class MetaProvider extends BaseProvider {
	protected abstract readonly baseUrl: string;
	protected abstract readonly name: string;
	protected abstract readonly headers: Record<string, string>;
}
