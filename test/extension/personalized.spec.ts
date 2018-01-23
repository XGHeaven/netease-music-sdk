import { getLoginedClient} from '../'
import { MusicClient } from '../../src'

let client: MusicClient

beforeAll(async () => {
    client = await getLoginedClient()
})

it('getPersonalFM', async () => {
    const fm = await client.getPersonalFM()
    expect(fm).toHaveProperty('data')
    expect(fm).toHaveProperty('popAdjust')
})

describe.skip('getPersonalPlaylist', () => {
    // TODO: 不清楚这个是干啥的
    it('base', async () => {
        const data = await client.getPersonalPlaylist()
    })
})

it('getPersonalNewSong', async () => {
    const data = await client.getPersonalNewSong()
    expect(data).toHaveProperty('result')
    expect(data.result).toHaveLength(10)
})

it('getPersonalDj', async () => {
    const data = await client.getPersonalDj()
    expect(data).toHaveProperty('result')
    expect(data.result).toHaveLength(6)
})

it('getPersonalPrivateContent', async () => {
    const data = await client.getPersonalPrivateContent()
    expect(data).toHaveProperty('result')
    expect(data.result).toHaveLength(3)
})
