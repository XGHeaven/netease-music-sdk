import { getClient } from '../'
import { MusicClient, TopListType, TopPlaylistOrder, TopResourceArea } from '../../src'

let client: MusicClient

beforeAll(async () => {
    client = await getClient()
})

it('排行榜', async () => {
    const data = await client.getTopList(TopListType.飙升榜)
    expect(data).toHaveProperty('playlist.trackIds')
    expect(data).toHaveProperty('privileges')
})

describe('新碟上架', () => {
    it('area', async () => {
        // 实在是找不到返回的数据中，哪里标识地区
        // 所以这里假设不同的地区碟是不一样的

        const areas = (await Promise.all([
            client.getTopAlbum(TopResourceArea.ALL),
            client.getTopAlbum(TopResourceArea.ALL),
            client.getTopAlbum(TopResourceArea.EA),
            client.getTopAlbum(TopResourceArea.KR),
            client.getTopAlbum(TopResourceArea.JP),
            client.getTopAlbum(TopResourceArea.ZH),
        ])).map((item: any) => item.albums.map((album: any) => album.name))

        // 验证一下是否请求相同数据相同
        expect(areas[0]).toEqual(areas[1])

        // 跳过第一个
        for (let i = 1; i < areas.length - 1; i++) {
            for (let j = i + 1; j < areas.length; j++) {
                expect(areas[i]).not.toEqual(areas[j])
            }
        }
    })

    it('limit&offset', async () => {
        const list1 = await client.getTopAlbum(TopResourceArea.ALL, 10, 0)
        const list2 = await client.getTopAlbum(TopResourceArea.ALL, 20, 9)

        expect(list1.albums).toHaveLength(10)
        expect(list2.albums).toHaveLength(20)

        expect(list1.albums[9].name).toEqual(list2.albums[0].name)
    })
})

it('热门歌手', async () => {
    const list1 = await client.getTopArtist(10, 0)
    const list2 = await client.getTopArtist(20, 9)

    expect(list1.artists).toHaveLength(10)
    expect(list2.artists).toHaveLength(20)

    expect(list1.artists[9].name).toEqual(list2.artists[0].name)
})

describe('歌单（网友精选碟）', () => {
    it('cat', async () => {
        const lists = (await Promise.all([
            client.getTopPlaylist('全部', TopPlaylistOrder.NEW),
            client.getTopPlaylist('全部', TopPlaylistOrder.NEW),
            client.getTopPlaylist('欧美', TopPlaylistOrder.NEW),
            client.getTopPlaylist('华语', TopPlaylistOrder.NEW),
        ])).map((list: any) => list.playlists.map((playlist: any) => playlist.name))

        expect(lists[0]).toEqual(lists[1])

        for (let i = 1; i < lists.length - 1; i++) {
            for (let j = i + 1; j < lists.length; j++) {
                expect(lists[0]).toEqual(lists[1])
            }
        }
    })

    it('order', async () => {
        const list1 = await client.getTopPlaylist('全部', TopPlaylistOrder.NEW)
        const list2 = await client.getTopPlaylist('全部', TopPlaylistOrder.HOT)

        expect(list1.playlists.map((item: any) => item.name)).not.toEqual(list2.playlists.map((item: any) => item.name))
    })

    it('limit&offset', async () => {
        const list1 = await client.getTopPlaylist('全部', TopPlaylistOrder.NEW, 10, 0)
        const list2 = await client.getTopPlaylist('全部', TopPlaylistOrder.NEW, 20, 9)

        expect(list1.playlists).toHaveLength(10)
        expect(list2.playlists).toHaveLength(20)

        expect(list1.playlists[9].name).toEqual(list2.playlists[0].name)
    })
})

describe('精品歌单', () => {
    it('cat', async () => {
        const lists = (await Promise.all([
            client.getTopPlaylistHighquality('全部'),
            client.getTopPlaylistHighquality('全部'),
            client.getTopPlaylistHighquality('欧美'),
            client.getTopPlaylistHighquality('华语'),
        ])).map((list: any) => list.playlists.map((playlist: any) => playlist.name))

        expect(lists[0]).toEqual(lists[1])

        for (let i = 1; i < lists.length - 1; i++) {
            for (let j = i + 1; j < lists.length; j++) {
                expect(lists[0]).toEqual(lists[1])
            }
        }
    })

    it('limit&offset', async () => {
        const list1 = await client.getTopPlaylistHighquality('全部', 10)
        const list2 = await client.getTopPlaylistHighquality('全部', 20)

        expect(list1.playlists).toHaveLength(10)
        expect(list2.playlists).toHaveLength(20)

        // expect(list1.playlists[9].name).toEqual(list2.playlists[0].name)
    })
})
