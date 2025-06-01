import { expect, test } from 'bun:test';
import { META } from '../../src';
import Config from '../../src/config';
import { FilterDto } from '../../src/providers/meta/kuroji/types/FilterDto';
import { EProvider } from '../../src/providers/meta/kuroji/types/types';

const kuroji = new META.Kuroji();
kuroji.setBaseUrl(Config.KUROJI_URL);

test('returns info of anime', async () => {
	const data = await kuroji.getInfo(169927);
	expect(data).not.toEqual({});
}, 30000);

test('returns a search of anime list', async () => {
	const data = await kuroji.search('Alya Sometimes Hides Her Feelings In Russian');
	expect(data.data).not.toEqual([]);
}, 30000);

test('returns a filter of anime list', async () => {
	const data = await kuroji.getFilter(new FilterDto({ id: 169927 }));
	expect(data.data).not.toEqual([]);
}, 30000);

test('returns episodes', async () => {
	const data = await kuroji.getEpisodes(21);
	expect(data).not.toEqual([]);
}, 30000);

test('returns providers', async () => {
	const data = await kuroji.getProviders(169927);
	expect(data).not.toEqual([]);
}, 30000);

// test('returns sources for episode and provider', async () => {
//   const data = await kuroji.getSources(21, 1, EProvider.zoro)
//   expect(data).not.toEqual([]);
// })