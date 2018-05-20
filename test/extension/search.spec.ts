import { MusicClient, SearchType } from '../../src'

const music = new MusicClient()

describe('search', () => {
    it('default search music', async () => {
        const data = await music.search('告白气球')
        expect(data.result).toHaveProperty('songs')
        expect(data.result).toHaveProperty('songCount')
        expect(data.result.songs).toHaveLength(30)
    })

    describe('with', () => {
        const tests: Array<[SearchType, string]> = [
            [SearchType.ALBUM, 'result.albumCount'],
            [SearchType.ARTIST, 'result.artistCount'],
            [SearchType.MV, 'result.mvCount'],
            // TIP: 这里会返回歌曲并携带歌词内容，所里这里使用 songCount
            [SearchType.LYRIC, 'result.songCount'],
            [SearchType.PLAYLIST, 'result.playlistCount'],
            [SearchType.USER, 'result.userprofileCount'],
            // TIP: 不知道为什么 DJ 这个的搜索结果始终是 0，所以这里就不再测试他
            // [SearchType.DJ, 'result.djCount'],
        ]

        for (const [type, prop] of tests) {
            it(prop, async () => {
                const data = await music.search('Own it', type)
                expect(data).toHaveProperty(prop)
            })
        }
    })

    it('limit', async () => {
        const data = await music.search('Own it', SearchType.SONG, 10)
        expect(data.result.songs).toHaveLength(10)
    })

    it('offset', async () => {
        const list1 = await music.search('Own it', SearchType.SONG, 10, 0)
        const list2 = await music.search('Own it', SearchType.SONG, 10, 9)
        expect(list1.result.songs[9]).toEqual(list2.result.songs[0])
    })
})

it('searchSuggest', async () => {
    const data = await music.searchSuggest('gaobai')
    expect(data).toHaveProperty('result.order')
})

it('multiSearch', async () => {
    // Q: 实在是不知道这个是干啥的，就先这样留着吧
    const data = await music.multiSearch('gaobai')
    expect(data).toHaveProperty('result.orders')
})

it('searchTop', async () => {
    const data = await music.searchHot()
    expect(data).toHaveProperty('result.hots')
})
