import { createHash } from 'crypto'
import { MusicClient } from '../client'
import { BaseRequestData, createWebAPIRequest } from '../lib/request'

declare module '../client' {
    interface MusicClient {
        emailLogin(email: string, password: string): Promise<any>
        phoneLogin(phone: string, password: string): Promise<any>
        refreshLogin(): Promise<any>
    }
}

export interface LoginData extends BaseRequestData {
    // TODO
}

MusicClient.prototype.emailLogin = async function(email: string, password: string) {
    const md5sum = createHash('md5')
    md5sum.update(password)

    return await this.requestWithSetCookie(
        'music.163.com',
        '/weapi/login?csrf_token=',
        'POST',
        {
            clientToken: '1_jVUMqWEPke0/1/Vu56xCmJpo5vP1grjn_SOVVDzOc78w8OKLVZ2JH7IfkjSXqgfmh',
            password: md5sum.digest('hex'),
            rememberLogin: 'true',
            username: email,
        },
    )
}

MusicClient.prototype.phoneLogin = async function(phone: string, password: string) {
    const md5sum = createHash('md5')
    md5sum.update(password)

    return await this.requestWithSetCookie(
        'music.163.com',
        '/weapi/login/cellphone',
        'POST',
        {
            phone,
            password: md5sum.digest('hex'),
            rememberLogin: 'true',
        },
    )
}

MusicClient.prototype.refreshLogin = async function() {
    return await this.requestWithSetCookie(
        'music.163.com',
        `/weapi/login/token/refresh`,
        'POST',
        {
            csrf_token: '',
        },
    )
}
