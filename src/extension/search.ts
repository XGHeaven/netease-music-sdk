import { MusicClient } from '../client'

export enum SearchType {
    SONG = 1,
    ALBUM = 10,
    ARTIEST = 100,
    PLAYLIST = 1000,
    USER = 1002,
    MV = 1004,
    LYRIC = 1006,
    DJ = 1009,
}

declare module '../client' {
    interface MusicClient {
        search(keyword: string, type: SearchType, limit: number, offset: number): Promise<any>
        searchSuggest(keyword: string, type: SearchType, limit: number, offset: number): Promise<any>
        multiSearch(keyword: string, type: SearchType): Promise<any>
    }
}

MusicClient.prototype.search = async function(
    keyword: string,
    type: SearchType = SearchType.SONG,
    limit: number = 1,
    offset: number = 30,
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

MusicClient.prototype.searchSuggest = async function(
    keyword: string,
    type: SearchType = SearchType.SONG,
    limit: number = 1,
    offset: number = 30,
) {
    // TODO: ????? why not use type/limit/offset?
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
