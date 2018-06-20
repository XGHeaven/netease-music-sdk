import { MusicClient } from '../../src'
import { testLimitOffset } from '../helper/common'

const client = new MusicClient()

const JackieChan = 3684 // 林俊杰

describe.skip('getArtistSongs', () => {
    // TODO: 这里暂时没有获取全部歌曲的接口
})

it('getArtistHotSongs', async () => {
    const data = await client.getArtistHotSongs(JackieChan)
    expect(data).toHaveProperty('artist')
    expect(data.artist.name).toEqual('林俊杰')
    expect(data).toHaveProperty('hotSongs')
})

describe('getArtistMvs', () => {
    it('base', async () => {
        const data = await client.getArtistMvs(JackieChan)
        expect(data).toHaveProperty('mvs')
        expect(data).toHaveProperty('hasMore')
        expect(data.mvs).toHaveLength(30)
    })

    it.skip('当 limit 为 4 的倍数的时候，offset 是才是准确的', async () => {
        const testLimit = async (limit: number) => {
            const list1 = await client.getArtistMvs(JackieChan, limit, 0)
            const list2 = await client.getArtistMvs(JackieChan, limit, limit - 1)
            expect(list1.mvs).toHaveLength(limit)
            expect(list1.mvs[limit - 1].id).toEqual(list2.mvs[0].id)
        }

        for (const times of [2, 3, 4, 5, 8]) {
            await testLimit(times * 4)
        }
    })

    it('limit&offset', async () => {
        await testLimitOffset(async (limit, offset) => {
            return (await client.getArtistMvs(JackieChan, limit, offset)).mvs.map((mv: any) => mv.name)
        }, 12)
    })
})

describe('getArtistAlbum', () => {
    it('base', async () => {
        const data = await client.getArtistAlbums(JackieChan)
        expect(data).toHaveProperty('hotAlbums')
        expect(data).toHaveProperty('more')
        expect(data.hotAlbums).toHaveLength(30)
    })

    it('limit&offset', async () => {
        await testLimitOffset(async (limit, offset) => {
            return (await client.getArtistAlbums(JackieChan, limit, offset)).hotAlbums.map((album: any) => album.name)
        }, 10)
    })
})

it('getArtistInfo', async () => {
    const data = await client.getArtistInfo(JackieChan)
    expect(data).toHaveProperty('introduction')
})
