import type { IAnimeInfo } from '../../../types/types'
import { AnimeProvider } from '../../base/anime'

export class HiAnime extends AnimeProvider {
  override readonly name = 'Kuroji';
  protected override baseUrl = '';
  protected override isAlive = true;
  protected override headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'User-Agent': 'nihonium client (https://github.com/Nihonium-Org/nihonium.js)',
  };
}