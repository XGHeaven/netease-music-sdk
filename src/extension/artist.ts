import { BaseClient } from '../client'

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
