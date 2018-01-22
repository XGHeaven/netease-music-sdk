import { MusicClient } from '../client'

declare module '../client' {
    interface MusicClient {
        getArtistSongs(id: number, limit?: number, offset?: number): Promise<any>
        getArtistMvs(id: number, limit?: number, offset?: number): Promise<any>
        getArtistAlbums(id: number, limit?: number, offset?: number): Promise<any>
        getArtistInfo(id: number): Promise<any>
    }
}

MusicClient.prototype.getArtistSongs = async function(id: number, limit: number = 30, offset: number = 0) {
    return await this.request(
        'music.163.com',
        `/weapi/v1/artist/${id}?offset=${offset}&limit=${limit}`,
        'POST',
    )
}

MusicClient.prototype.getArtistMvs = async function(id: number, limit: number = 30, offset: number = 0) {
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

MusicClient.prototype.getArtistAlbums = async function(id: number, limit: number = 30, offset: number = 0) {
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

MusicClient.prototype.getArtistInfo = async function(id: number) {
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
