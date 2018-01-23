import { MusicClient } from '../client'
import { BaseRequestData } from '../lib/request'

declare module '../client' {
    interface MusicClient {
        /**
         * 获取个人电台
         * @returns {Promise<any>}
         */
        getPersonalFM(): Promise<any>

        /**
         * 获取个人推荐歌单
         * @question 找不到应用
         * @param {number} limit
         * @param {number} offset
         * @returns {Promise<any>}
         */
        getPersonalPlaylist(limit?: number, offset?: number): Promise<any>

        /**
         * 获取个人推荐新歌
         * @question 找不到应用
         * @returns {Promise<any>}
         */
        getPersonalNewSong(): Promise<any>

        /**
         * 获取个人推荐电台
         * @question 找不到应用
         * @returns {Promise<any>}
         */
        getPersonalDj(): Promise<any>

        /**
         * 获取独家放送
         * @question 找不到应用
         * @returns {Promise<any>}
         */
        getPersonalPrivateContent(): Promise<any>
    }
}

export interface PersonalSingleFMData {
    album: {},
    alg: string,
}

export interface PersonalFMData extends BaseRequestData {
    popAdjust: boolean
    data: PersonalFMData[]
}

MusicClient.prototype.getPersonalFM = async function() {
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

MusicClient.prototype.getPersonalPlaylist = async function(limit: number = 30, offset: number = 0) {
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

MusicClient.prototype.getPersonalNewSong = async function() {
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

MusicClient.prototype.getPersonalDj = async function() {
    await this.checkLogin()
    return await this.request(
        'music.163.com',
        '/weapi/personalized/djprogram',
        'POST',
        {},
    )
}

MusicClient.prototype.getPersonalPrivateContent = async function() {
    await this.checkLogin()
    return await this.request(
        'music.163.com',
        '/weapi/personalized/privatecontent',
        'POST',
        {},
    )
}
