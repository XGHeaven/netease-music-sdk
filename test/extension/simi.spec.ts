import { MusicClient } from '../../src'
import { getClient, getLoginedClient } from '../index'

let client: MusicClient
let noLoginClient: MusicClient

beforeAll(async () => {
    client = await getLoginedClient()
    noLoginClient = await getClient()
})

it('getSimiUser', async () => {
    const data = await client.getSimiUser(28157586) // If I Die Young
    expect(data).toHaveProperty('userprofiles')
    expect(data.userprofiles).toHaveLength(5)
})

it('getSimiSong', async () => {
    const data = await noLoginClient.getSimiSong(28157586)
    expect(data).toHaveProperty('songs')
    expect(data.songs).toHaveLength(5)
})

it('getSimiPlaylist', async () => {
    const data = await noLoginClient.getSimiPlaylist(28157586)
    expect(data).toHaveProperty('playlists')
    expect(data.playlists).toHaveLength(3)
})

it('getSimiMv', async () => {
    const data = await noLoginClient.getSimiMv(5382080) // 告白气球 mv
    expect(data).toHaveProperty('mvs')
    expect(data.mvs).toHaveLength(5)
})

it('getSimiArtist', async () => {
    const data = await client.getSimiArtist(6452)
    expect(data).toHaveProperty('artists')
    expect(data.artists).toHaveLength(20)
})
