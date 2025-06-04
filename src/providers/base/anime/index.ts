import { BaseProvider } from '../main-class'

export abstract class AnimeProvider extends BaseProvider {
  protected abstract readonly baseUrl: string
  protected abstract readonly name: string
  protected abstract readonly isAlive: boolean
  protected abstract readonly headers: Record<string, string>
}