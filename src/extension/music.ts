import { BaseClient } from '../client'

export class MusicExtClient extends BaseClient {
    /**
     * 获取音乐的连接，很多歌曲都不会直接返回歌曲链接，需要你通过这个接口手动获取
     * @param {number | string[] | string} id
     * @param {number} br
     * @returns {Promise<any>}
     */
    async getMusicUrl(id: number | string[] | string, br: number = 999000) {
        if (typeof id === 'number') {
            id = id.toString()
        } else if (Array.isArray(id)) {
            id.join(',')
        }

        return await this.request(
            'music.163.com',
            '/weapi/song/enhance/player/url',
            'POST',
            {
                br,
                csrf_token: '',
                ids: [id],
            },
        )
    }

    /**
     * 喜欢某个音乐
     * @param {number} id 歌曲 ID
     * @param {boolean} like 喜欢还是取消喜欢
     * @returns {Promise<any>}
     */
    async doLikeMusic(id: number, like: boolean = true) {
        await this.checkLogin()
        return await this.request(
            'music.163.com',
            `/weapi/radio/like?alg=${'itembased'}&trackId=${id}&like=${like}&time=${25}`,
            'POST',
            {
                like,
                csrf_token: '',
                trackId: id,
            },
        )
    }

    /**
     * 获取歌曲信息
     * @param {number} id
     * @returns {Promise<any>}
     */
    async getSongInfo(id: number) {
        return await this.request(
            'music.163.com',
            '/weapi/v3/song/detail',
            'POST',
            {
                c: JSON.stringify([{ id }]),
                csrf_token: '',
                ids: '[' + id + ']',
            },
        )
    }

    /**
     * 获取歌曲的歌词
     * @param {number} sid
     * @returns {Promise<any>}
     */
    async getSongLyric(sid: number) {
        return await this.request(
            'music.163.com',
            '/weapi/song/lyric?os=osx&id=' + sid + '&lv=-1&kv=-1&tv=-1',
            'POST',
        )
    }

}
