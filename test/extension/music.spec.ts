import { MusicClient } from '../../src'
import { getLoginedClient } from '../index'

const client = new MusicClient()
let loginedClient: MusicClient

beforeAll(async () => {
    loginedClient = await getLoginedClient()
})

it('getMusicUrl', async () => {
    const data = await client.getMusicUrl(418603077) // 告白气球
    expect(data).toHaveProperty('data')
    expect(data.data).toHaveLength(1)
    expect(data.data[0]).toHaveProperty('url')
})

describe.skip('doLikeMusic', () => {
    // 这里如果用自己的账号测试，那么请选择一首你不常用的歌
    // 因为这里会先测试喜欢，然后再测试取消喜欢
    // 但是由于返回的歌曲信息里面不包含是否有被 Like，所以只能通过先获取喜欢歌曲的歌单
    // 这里又一点很神奇，你要通过歌单的 specialType 是否是 5 来判断是不是喜欢的歌单。这个值是归纳出来的
    // 但是因为这里牵扯到要使用用户 ID，所以等我完成用户 ID 这部分之后再去处理
    // TODO
})

it('getSongInfo', async () => {
    const data = await client.getSongInfo(418603077) // 告白气球
    expect(data).toHaveProperty('songs')
    expect(data.songs).toHaveLength(1)
    expect(data.songs[0].name).toEqual('告白气球')
})

describe('getSongLyric', () => {
    it('if song has lyric', async () => {
        const data = await client.getSongLyric(418603077) // 告白气球
        expect(data).toHaveProperty('lrc')
    })

    it('if song do not has lyric', async () => {
        const data = await client.getSongLyric(28661554) // In the air
        expect(data.nolyric).toBeTruthy()
        expect(data).not.toHaveProperty('lrc')
    })
})
