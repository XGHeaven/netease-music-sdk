import { BaseClient } from '../client'

/**
 * @internal
 */
export enum SearchType {
    SONG = 1,
    ALBUM = 10,
    ARTIST = 100,
    PLAYLIST = 1000,
    USER = 1002,
    MV = 1004,
    LYRIC = 1006,
    DJ = 1009,
}

export class SearchExtClient extends BaseClient {
    /**
     * 搜索，顾名思义
     * @param {string} keyword
     * @param {SearchType} type
     * @param {number} limit
     * @param {number} offset
     * @returns {Promise<any>}
     */
    async search(
        keyword: string,
        type: SearchType = SearchType.SONG,
        limit: number = 30,
        offset: number = 0,
    ) {
        return await this.request(
            'music.163.com',
            '/weapi/search/get',
            'POST',
            {
                limit,
                offset,
                type,
                csrf_token: '',
                s: keyword,
            },
        )
    }

    /**
     * 获取搜索建议
     * @param {string} keyword
     * @returns {Promise<any>}
     */
    async searchSuggest(keyword: string) {
        return await this.request(
            'music.163.com',
            '/weapi/search/suggest/web',
            'POST',
            {
                csrf_token: '',
                s: keyword || '',
            },
        )
    }

    /**
     * 获取多重搜索
     * PS: 理论上应该会有 Offset 和 Limit 参数，但是经过我的测试，Type 也没有用，不知道这个和 MusicClient#searchSuggest 的区别
     * @param {string} keyword
     * @param {SearchType} type
     * @returns {Promise<any>}
     */
    async multiSearch(keyword: string, type: SearchType = SearchType.SONG) {
        // TODO
        return await this.request(
            'music.163.com',
            '/weapi/search/suggest/multimatch',
            'POST',
            {
                type,
                csrf_token: '',
                s: keyword,
            },
        )
    }

    /**
     * 获取热搜
     * @returns {Promise<any>}
     */
    async searchHot() {
        return await this.request(
            'music.163.com',
            '/weapi/search/hot',
            'POST',
            {
                type: 1111,
            },
        )
    }
}
