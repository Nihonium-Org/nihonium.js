import { META } from '../../src'
import Config from '../../src/config'
import { FilterDto } from '../../src/providers/meta/kuroji/types/FilterDto'
import { EProvider } from '../../src/providers/meta/kuroji/types/types'
import { MediaFormat, MediaSeason, MediaSort, MediaStatus } from '../../src/providers/meta/kuroji/types/Filter'

jest.setTimeout(30000)

const kuroji = new META.Kuroji()
kuroji.setBaseUrl(Config.KUROJI_URL)

describe('Kuroji Provider', () => {
  const testAnimeId = 21 // Using a known anime ID for testing
  const testFranchise = 'naruto'

  test('returns info of anime', async () => {
    const data = await kuroji.getInfo(testAnimeId)
    expect(data).toBeDefined()
    expect(data).not.toEqual({})
  })

  test('returns a search of anime list', async () => {
    const data = await kuroji.search('Naruto')
    expect(data.data).toBeDefined()
    expect(data.data).not.toEqual([])
  })

  test('returns a filter of anime list', async () => {
    const filter = new FilterDto({
      format: MediaFormat.TV,
      sort: [MediaSort.POPULARITY]
    })
    const data = await kuroji.getFilter(filter)
    expect(data.data).not.toEqual([])
  })

  test('returns recommendations', async () => {
    const filter = new FilterDto({ page: 1, perPage: 10 })
    const data = await kuroji.getRecommendations(testAnimeId, filter)
    expect(data.data).toBeDefined()
    expect(data.data).not.toEqual([])
  })

  test('returns chronology', async () => {
    const filter = new FilterDto({ page: 1, perPage: 10 })
    const data = await kuroji.getChronology(testAnimeId, filter)
    expect(data.data).toBeDefined()
    expect(data.data).not.toEqual([])
  })

  test('returns franchise', async () => {
    const filter = new FilterDto({ page: 1, perPage: 10 })
    const data = await kuroji.getFranchise(testFranchise, filter)
    expect(data).toBeDefined()
    expect(data.data).not.toEqual([])
  })

  test('returns characters', async () => {
    const data = await kuroji.getCharacters(testAnimeId, 1, 10)
    expect(data.data).toBeDefined()
    expect(data.data).not.toEqual([])
  })

  test('returns random anime', async () => {
    const data = await kuroji.getRandom()
    expect(data).toBeDefined()
    expect(data).not.toEqual({})
  })

  test('returns schedule', async () => {
    const data = await kuroji.getSchedule()
    expect(data).toBeDefined()
    expect(data).not.toEqual({})
  })

  test('returns all genres', async () => {
    const data = await kuroji.getAllGenres()
    expect(data).toBeDefined()
    expect(data).not.toEqual([])
  })

  test('returns all tags', async () => {
    const data = await kuroji.getAllTags(1, 10)
    expect(data.data).toBeDefined()
    expect(data.data).not.toEqual([])
  })

  test('returns episodes', async () => {
    const data = await kuroji.getEpisodes(testAnimeId)
    expect(data).toBeDefined()
    expect(data).not.toEqual([])
  })

  test('returns specific episode', async () => {
    const data = await kuroji.getEpisode(testAnimeId, 1)
    expect(data).toBeDefined()
    expect(data).not.toEqual({})
  })

  // test('returns providers', async () => {
  //   const data = await kuroji.getProviders(testAnimeId)
  //   expect(data).toBeDefined()
  //   expect(data).not.toEqual([])
  // })

  // test('returns specific provider', async () => {
  //   const data = await kuroji.getProvider(testAnimeId, 1)
  //   expect(data).toBeDefined()
  //   expect(data).not.toEqual({})
  // })

  // test('returns sources for episode and provider', async () => {
  //   const data = await kuroji.getSources(testAnimeId, 1, EProvider.zoro)
  //   expect(data).toBeDefined()
  //   expect(data).not.toEqual({})
  // })

  test('filter with multiple parameters', async () => {
    const filter = new FilterDto({
      format: MediaFormat.TV,
      status: MediaStatus.FINISHED,
      season: MediaSeason.WINTER,
      sort: [MediaSort.POPULARITY, MediaSort.SCORE],
      page: 1,
      perPage: 20
    })
    const data = await kuroji.getFilter(filter)
    expect(data.data).toBeDefined()
    expect(data.data).not.toEqual([])
  })
})