import { MusicClient } from '../client'
import { BaseRequestData } from '../lib/request'

declare module '../client' {
    interface MusicClient {
        getPersonalFM(limit?: number, offset?: number): Promise<any> // 个人 FM
        getPersonalPlaylist(): Promise<any> // 个人推荐歌单
        getPersonalNewSong(): Promise<any> // 个人推荐新歌
        getPersonalDj(): Promise<any> // 个人推荐电台
        getPersonalPrivateContent(): Promise<any> // 独家放送
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
