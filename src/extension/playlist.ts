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
   * 更新歌单
   * @param {number} id 歌单 ID
   * @param {string} name 歌单名字
   * @param {string} desc 歌单描述
   * @param {string} tags 歌单标签
   * @returns {Promise<any>}
   */
    async updatePlaylist(id: number, name: string, desc: string, tags: string) {
      await this.checkLogin()
      return await this.request(
        'music.163.com',
        '/weapi/batch',
        'POST',
        {
          '/api/playlist/desc/update': `{"id": ${id}, "desc":"${desc}"}`,
          '/api/playlist/tags/update': `{"id": ${id}, "tags":"${tags}"}`,
          '/api/playlist/update/name': `{"id": ${id}, "name":"${name}"}`,
          'csrf_token': '',
        },
      )
    }

  /**
   * 新建歌单
   * @param {string} name 歌单名
   * @returns {Promise<any>}
   */
    async createPlaylist(name: string) {
        await this.checkLogin()
        return await this.request(
            'music.163.com',
            '/weapi/playlist/create',
            'POST',
            {
                name,
                csrf_token: '',
            },
        )
    }

  /**
   * 收藏/取消收藏歌单
   * @param {number} playlistId 表单 ID
   * @param {"subscribe" | "unsubscribe"} action 收藏或者取消收藏
   * @returns {Promise<any>}
   */
    async subscribePlyalist(playlistId: number, action: 'subscribe' | 'unsubscribe' = 'subscribe') {
      await this.checkLogin()
      return await this.request(
        'music.163.com',
        `/weapi/playlist/${action}`,
        'POST',
        {
          csrf_token: '',
          id: playlistId,
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
