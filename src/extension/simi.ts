/**
 * 获取相似音乐，部分需要登录，部分不需要。只不过在登录与不登录之间，推荐的相似音乐不同
 */
import { BaseClient } from '../client'

export class SimiExtClient extends BaseClient {
    /**
     * 获取最近 5 个听了这首歌的用户
     * @param {number} sid Song ID
     * @returns {Promise<any>}
     */
    async getSimiUser(sid: number) {
        await this.checkLogin()
        return await this.request(
            'music.163.com',
            '/weapi/discovery/simiUser',
            'POST',
            {
                songid: sid,
            },
        )
    }

    /**
     * 获取 5 个相似音乐
     * @param {number} sid
     * @returns {Promise<any>}
     */
    async getSimiSong(sid: number) {
        return await this.request(
            'music.163.com',
            '/weapi/v1/discovery/simiSong',
            'POST',
            {
                songid: sid,
            },
        )
    }

    /**
     * 包含某一首歌的歌单，一般是 3 个
     * @param {number} sid 歌曲 ID
     * @returns {Promise<any>}
     */
    async getSimiPlaylist(sid: number) {
        return await this.request(
            'music.163.com',
            '/weapi/discovery/simiPlaylist',
            'POST',
            {
                songid: sid,
            },
        )
    }

    /**
     * 获取 5 个相似 MV
     * @param {number} mid
     * @returns {Promise<any>}
     */
    async getSimiMv(mid: number) {
        return await this.request(
            'music.163.com',
            '/weapi/discovery/simiMV',
            'POST',
            {
                mvid: mid,
            },
        )
    }

    /**
     * 获取相似歌手
     * @param {number} aid
     * @returns {Promise<any>}
     */
    async getSimiArtist(aid: number) {
        await this.checkLogin()
        return await this.request(
            'music.163.com',
            `/weapi/discovery/simiArtist`,
            'POST',
            {
                artistid: aid,
                csrf_token: '',
            },
        )
    }

}
