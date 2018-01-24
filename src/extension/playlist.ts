import { BaseClient } from '../client'

/**
 * @internal
 */
export enum PlaylistOperation {
    DELETE = 'del',
    ADD = 'add',
}

export class PlaylistExtClient extends BaseClient {
    async getPlaylistInfo(id: number) {
        return await this.request(
            'music.163.com',
            '/weapi/v3/playlist/detail',
            'POST',
            {
                id,
                csrf_token: '',
                n: 100000,
            },
        )
    }

    async doPlaylistTrack(
        pid: number,
        mid: number,
        op: PlaylistOperation = PlaylistOperation.ADD,
    ) {
        await this.checkLogin()
        return await this.request(
            'music.163.com',
            '/weapi/playlist/manipulate/tracks',
            'POST',
            {
                op,
                pid,
                csrf_token: '',
                trackIds: JSON.stringify([mid]),
                tracks: mid,
            },
        )
    }

    async getPlaylistCatalogue() {
        return await this.request(
            'music.163.com',
            '/weapi/playlist/catalogue',
            'POST',
        )
    }

    async getPlaylistHotTag() {
        return await this.request(
            'music.163.com',
            '/weapi/playlist/hottags',
            'POST',
            {},
        )
    }

}
