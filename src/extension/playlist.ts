import { BaseClient } from '../client'

/**
 * @internal
 */
export enum PlaylistOperation {
    DELETE = 'del',
    ADD = 'add',
}

export class PlaylistExtClient extends BaseClient {
    /**
     * 获取歌单信息
     * @param {number} id
     * @returns {Promise<any>}
     */
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

    /**
     * 对歌单添加或者删除歌曲
     * @param {number} pid 歌单 ID
     * @param {number} mid 歌曲 ID
     * @param {PlaylistOperation} op 操作，添加函数删除
     * @returns {Promise<any>}
     */
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

    /**
     * 获取歌单种类
     * @returns {Promise<any>}
     */
    async getPlaylistCatalogue() {
        return await this.request(
            'music.163.com',
            '/weapi/playlist/catalogue',
            'POST',
        )
    }

    /**
     * 获取歌单热门标签
     * @returns {Promise<any>}
     */
    async getPlaylistHotTag() {
        return await this.request(
            'music.163.com',
            '/weapi/playlist/hottags',
            'POST',
            {},
        )
    }

}
