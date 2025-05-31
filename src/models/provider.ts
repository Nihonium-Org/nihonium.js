import Proxy from './proxy'

abstract class Provider extends Proxy {
  abstract readonly name: string;
  protected abstract readonly baseUrl: string;
}

export default Provider;