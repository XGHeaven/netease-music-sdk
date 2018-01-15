import { MusicClient } from '../client'
import { BaseRequestData } from '../lib/request'

declare module '../client' {
    interface MusicClient {
        personalFM(): Promise<any> // 个人 FM
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

MusicClient.prototype.personalFM = async function() {
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
