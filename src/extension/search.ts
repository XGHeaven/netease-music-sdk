import { MusicClient } from '../client'

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

declare module '../client' {
    interface MusicClient {
        search(keyword: string, type?: SearchType, limit?: number, offset?: number): Promise<any>
        searchSuggest(keyword: string): Promise<any>
        multiSearch(keyword: string, type?: SearchType): Promise<any>
    }
}

MusicClient.prototype.search = async function(
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
            csrf_token: '',
            limit,
            offset,
            s: keyword,
            type,
        },
    )
}

MusicClient.prototype.searchSuggest = async function(keyword: string) {
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

MusicClient.prototype.multiSearch = async function(keyword: string, type: SearchType = SearchType.SONG) {
    // TODO: 理论上应该会有 Offset 和 Limit 参数，但是经过我的测试，Type 也没有用，不知道这个和 MusicClient#searchSuggest 的区别
    return await this.request(
        'music.163.com',
        '/weapi/search/suggest/multimatch',
        'POST',
        {
            csrf_token: '',
            s: keyword,
            type,
        },
    )
}
