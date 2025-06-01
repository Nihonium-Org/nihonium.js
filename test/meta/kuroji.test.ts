import { META } from '../../src'
import Config from '../../src/config'
import { FilterDto } from '../../src/providers/meta/kuroji/types/FilterDto'
import { EProvider } from '../../src/providers/meta/kuroji/types/types'

jest.setTimeout(30000)

const kuroji = new META.Kuroji();
kuroji.setBaseUrl(Config.KUROJI_URL)

test('returns info of anime', async () => {
  const data = await kuroji.getInfo(21);
  expect(data).not.toEqual({});
})

test('returns a search of anime list', async () => {
  const data = await kuroji.search('Naruto');
  expect(data.data).not.toEqual([]);
})

test('returns a filter of anime list', async () => {
  const data = await kuroji.getFilter(new FilterDto({ id: 21 }));
  expect(data.data).not.toEqual([]);
})

test('returns episodes', async () => {
  const data = await kuroji.getEpisodes(21);
  expect(data).not.toEqual([]);
})

test('returns providers', async () => {
  const data = await kuroji.getProviders(21)
  expect(data).not.toEqual([]);
})

test('returns sources for episode and provider', async () => {
  const data = await kuroji.getSources(21, 1, EProvider.zoro)
  expect(data).not.toEqual([]);
})