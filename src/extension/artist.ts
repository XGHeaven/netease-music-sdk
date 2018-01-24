import { BaseClient } from '../client'

export class ArtistExtClient extends BaseClient {
    async getArtistSongs(id: number, limit: number = 30, offset: number = 0) {
        return await this.request(
            'music.163.com',
            `/weapi/v1/artist/${id}?offset=${offset}&limit=${limit}`,
            'POST',
        )
    }

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
