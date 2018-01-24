import { BaseClient } from '../client'

export class MusicExtClient extends BaseClient {
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

    async getSongLyric(sid: number) {
        return await this.request(
            'music.163.com',
            '/weapi/song/lyric?os=osx&id=' + sid + '&lv=-1&kv=-1&tv=-1',
            'POST',
        )
    }

}
