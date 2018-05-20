import { BaseClient } from '../client'

/**
 * 歌手分类代码
 *
 * - 华语男歌手 1001
 * - 华语女歌手 1002
 * - 华语组合/乐队 1003
 * - 欧美男歌手 2001
 * - 欧美女歌手 2002
 * - 欧美组合/乐队 2003
 * - 其他男歌手 4001
 * - 其他女歌手 4002
 * - 其他组合/乐队 4003
 * - 入驻歌手 5001
 * - 日本男歌手 6001
 * - 日本女歌手 6002
 * - 日本组合/乐队 6003
 * - 韩国男歌手 7001
 * - 韩国女歌手 7002
 * - 韩国组合/乐队 7003
 */
export type ArtistCatalogueCode =
    '1001' | '1002' | '1003' |
    '2001' | '2002' | '2003' |
    '4001' | '4002' | '4003' |
    '5001' |
    '6001' | '6002' | '6003' |
    '7001' | '7002' | '7003'

export class ArtistExtClient extends BaseClient {
    /**
     * 获取歌手的全部歌曲
     *
     * 经过测试，这里实际上的结果和 [getArtistHotSongs](#getartisthotsongs) 一致
     * @param {number} id
     * @param {number} limit
     * @param {number} offset
     * @returns {Promise<any>}
     */
    async getArtistSongs(id: number, limit: number = 30, offset: number = 0) {
        return await this.request(
            'music.163.com',
            `/weapi/v1/artist/${id}?offset=${offset}&limit=${limit}`,
            'POST',
        )
    }

    /**
     * 收藏/取消收藏歌手
     * @param {number} id 歌手 ID
     * @param {"subscribe" | "unsubscribe"} action
     * @returns {Promise<any>}
     */
    async subscribeArtist(id: number, action: 'subscribe' | 'unsubscribe' = 'subscribe') {
        await this.checkLogin()
        return await this.request(
            'music.163.com',
            `/weapi/artist/${action === 'subscribe' ? 'sub' : 'unsub'}`,
            'POST',
            {
                artistId: `${id}`,
            },
        )
    }

    /**
     * 根据类型获取歌手列表
     * @param {ArtistCatalogueCode} catalogue 歌手类型
     * @param {number} limit 返回分页数量限制
     * @param {number} offset 返回分页偏移
     * @returns {Promise<any>}
     */
    async getArtistList(
        catalogue: ArtistCatalogueCode,
        limit: number = 50,
        offset: number = 0,
    ) {
        return await this.request(
            'music.163.com',
            '/weapi/artist/list',
            'POST',
            {
                limit,
                offset,
                categoryCode: catalogue,
                total: 'false', // TODO: api 中没有定义，暂时写死了
            },
        )
    }

    /**
     * 获取歌手的最热 50 首歌曲
     * @param {number} id
     * @returns {Promise<any>}
     */
    async getArtistHotSongs(id: number) {
        return await this.request(
            'music.163.com',
            `/weapi/v1/artist/${id}`,
            'POST',
        )
    }

    /**
     * 获取歌手的全部 MV
     *
     * 不知道为什么，当 limit 为某些值的时候，offset 的结果会出现紊乱
     *
     * 经过测试，在 30 以内的有 `9` `10` `14` `20` `21` `24` `25` 的 limit 值不正确，请尽量不要使用这几个值。
     * @param {number} id
     * @param {number} limit
     * @param {number} offset
     * @returns {Promise<any>}
     */
    async getArtistMvs(id: number, limit: number = 30, offset: number = 0) {
        return await this.request(
            'music.163.com',
            `/weapi/artist/mvs`,
            'POST',
            {
                limit,
                offset,
                artistId: id,
                csrf_token: '',
                total: true,
            },
        )
    }

    /**
     * 获取歌手的全部专辑
     * @param {number} id
     * @param {number} limit
     * @param {number} offset
     * @returns {Promise<any>}
     */
    async getArtistAlbums(id: number, limit: number = 30, offset: number = 0) {
        return await this.request(
            'music.163.com',
            `/weapi/artist/albums/${id}`,
            'POST',
            {
                limit,
                offset,
                csrf_token: '',
                total: true,
            },
        )
    }

    /**
     * 获取歌手的信息
     * @param {number} id
     * @returns {Promise<any>}
     */
    async getArtistInfo(id: number) {
        return await this.request(
            'music.163.com',
            `/weapi/artist/introduction`,
            'POST',
            {
                id,
                csrf_token: '',
            },
        )
    }

}
