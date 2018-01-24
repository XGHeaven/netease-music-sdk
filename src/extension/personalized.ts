import { BaseClient } from '../client'
import { BaseRequestData } from '../lib/request'

export interface PersonalSingleFMData {
    album: {},
    alg: string,
}

export interface PersonalFMData extends BaseRequestData {
    popAdjust: boolean
    data: PersonalFMData[]
}

export class PersonalizedExtClient extends BaseClient {
    /**
     * 获取个人电台
     * @returns {Promise<any>}
     */
    async getPersonalFM() {
        await this.checkLogin()
        return await this.request(
            'music.163.com',
            '/weapi/v1/radio/get',
            'POST',
            {
                csrf_token: '',
            },
        )
    }

    /**
     * 获取个人推荐歌单
     * @question 找不到应用
     * @param {number} limit
     * @param {number} offset
     * @returns {Promise<any>}
     */
    async getPersonalPlaylist(limit: number = 30, offset: number = 0) {
        await this.checkLogin()
        return await this.request(
            'music.163.com',
            '/weapi/personalized/playlist',
            'POST',
            {
                limit,
                offset,
                csrf_token: '',
                n: 1000,
                total: true,
            },
        )
    }

    /**
     * 获取个人推荐新歌
     * @question 找不到应用
     * @returns {Promise<any>}
     */
    async getPersonalNewSong() {
        await this.checkLogin()
        return await this.request(
            'music.163.com',
            '/weapi/personalized/newsong',
            'POST',
            {
                type: 'recommend',
            },
        )
    }

    /**
     * 获取个人推荐电台
     * @question 找不到应用
     * @returns {Promise<any>}
     */
    async getPersonalDj() {
        await this.checkLogin()
        return await this.request(
            'music.163.com',
            '/weapi/personalized/djprogram',
            'POST',
            {},
        )
    }

    /**
     * 获取独家放送
     * @question 找不到应用
     * @returns {Promise<any>}
     */
    async getPersonalPrivateContent() {
        await this.checkLogin()
        return await this.request(
            'music.163.com',
            '/weapi/personalized/privatecontent',
            'POST',
            {},
        )
    }
}
