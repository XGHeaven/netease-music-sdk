import { MusicClient } from '../client'

export enum TopListType {
    '新歌榜' = '3779629',
    '热歌榜' = '3778678',
    '原创歌曲榜' = '2884035',
    '飙升榜' = '19723756',
    '电音榜' = '10520166',
    'UK排行榜周榜' = '180106',
    '美国Billboard周榜' = '60198',
    'KTV嗨榜' = '21845217',
    'iTunes榜' = '11641012',
    'HitFMTop榜' = '120001',
    '日本Oricon周榜' = '60131',
    '韩国Melon排行榜周榜' = '3733003',
    '韩国Mnet排行榜周榜' = '60255',
    '韩国Melon原声周榜' = '46772709',
    '中国TOP排行榜(港台榜)' = '112504',
    '中国TOP排行榜(内地榜)' = '64016',
    '香港电台中文歌曲龙虎榜' = '10169002',
    '华语金曲榜' = '4395559',
    '中国嘻哈榜' = '1899724',
    '法国 NRJ EuroHot 30周榜' = '27135204',
    '台湾Hito排行榜' = '112463',
    'Beatport全球电子舞曲榜' = '3812895',
    '云音乐ACG音乐榜' = '71385702',
    '云音乐嘻哈榜' = '991319590',
}

export enum TopResourceArea {
    ALL = 'ALL',
    ZH = 'ZH',
    EA = 'EA',
    KR = 'KR',
    JP = 'JP',
}

export enum TopPlaylistOrder {
    NEW = 'new',
    HOT = 'hot',
}

declare module '../client' {
    interface MusicClient {
        /**
         * 获取排行榜
         * @param {TopListType} type
         * @param {number} limit
         * @param {number} offset
         * @returns {Promise<any>}
         */
        getTopList(type: TopListType, limit?: number, offset?: number): Promise<any>

        /**
         * 新碟上架
         * @param {TopResourceArea} type
         * @param {number} limit
         * @param {number} offset
         * @returns {Promise<any>}
         */
        getTopAlbum(type: TopResourceArea, limit?: number, offset?: number): Promise<any>

        /**
         * 热门歌手
         * @param {number} limit
         * @param {number} offset
         * @returns {Promise<any>}
         */
        getTopArtist(limit?: number, offset?: number): Promise<any>

        /**
         * 获取歌单 ( 网友精选碟 )
         * @param {string} cat
         * @param {TopPlaylistOrder} order
         * @param {number} limit
         * @param {number} offset
         * @returns {Promise<any>}
         */
        getTopPlaylist(cat: string, order: TopPlaylistOrder, limit?: number, offset?: number): Promise<any>

        /**
         * 获取精品歌单
         * @param {string} cat
         * @param {number} limit
         * @param {number} offset
         * @returns {Promise<any>}
         */
        getTopPlaylistHighquality(cat: string, limit?: number, offset?: number): Promise<any>

        /**
         * 获取新歌（缺失文档）
         * @param {TopResourceArea} area
         * @param {number} limit
         * @param {number} offset
         * @returns {Promise<any>}
         */
        getTopSong(area: TopResourceArea, limit?: number, offset?: number): Promise<any>
    }
}

MusicClient.prototype.getTopList = async function(type: TopListType, limit: number = 30, offset: number = 0) {
    return await this.request(
        'music.163.com',
        '/weapi/v3/playlist/detail',
        'POST',
        {
            csrf_token: '',
            id: type,
            limit,
            n: 1000,
            offset,
            total: true,
        },
    )
}

MusicClient.prototype.getTopAlbum = async function(type: TopResourceArea, limit: number = 30, offset: number = 0) {
    return await this.request(
        'music.163.com',
        '/weapi/album/new',
        'POST',
        {
            area: type,
            csrf_token: '',
            limit,
            offset,
            total: true,
        },
    )
}

MusicClient.prototype.getTopArtist = async function(limit: number = 30, offset: number = 0) {
    return await this.request(
        'music.163.com',
        `/weapi/artist/top`,
        'POST',
        {
            csrf_token: '',
            limit,
            offset,
            total: true,
        },
    )
}

MusicClient.prototype.getTopPlaylist = async function(
    cat: string, // TODO: 找一些一共有哪些类型，现在暂时还是通过手动输入好了，比如 '全部'。其实文档里只写了这个，我也不知道有哪些
    order: TopPlaylistOrder,
    limit: number = 30,
    offset: number = 0,
) {
    return await this.request(
        'music.163.com',
        '/weapi/playlist/list',
        'POST',
        {
            cat,
            limit,
            offset,
            order,
            total: 'true',
        },
    )
}

MusicClient.prototype.getTopPlaylistHighquality = async function(cat: string, limit: number = 30, offset: number = 0) {
    return await this.request(
        'music.163.com',
        '/weapi/playlist/highquality/list',
        'POST',
        {
            cat,
            csrf_token: '',
            limit,
            offset,
        },
    )
}

MusicClient.prototype.getTopSong = async function(area: TopResourceArea, limit: number = 30, offset: number = 0) {
    return await this.request(
        'music.163.com',
        '/weapi/v1/discovery/new/songs',
        'POST',
        {
            area,
            csrf_token: '',
            limit,
            offset,
            total: true,
        },
    )
}
