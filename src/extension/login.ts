import { createHash } from 'crypto'
import { BaseClient } from '../client'
import { BaseRequestData, createWebAPIRequest } from '../lib/request'

export interface LoginData extends BaseRequestData {
    // TODO
}

export class LoginExtClient extends BaseClient {
    async emailLogin(email: string, password: string) {
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

    async phoneLogin(phone: string, password: string) {
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

    async refreshLogin() {
        return await this.requestWithSetCookie(
            'music.163.com',
            `/weapi/login/token/refresh`,
            'POST',
            {
                csrf_token: '',
            },
        )
    }
}
