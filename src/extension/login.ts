import { createHash } from 'crypto'
import { BaseClient } from '../client'
import { BaseRequestData, createWebAPIRequest } from '../lib/request'

export interface LoginData extends BaseRequestData {
    // TODO
}

export class LoginExtClient extends BaseClient {
    /**
     * 邮件登录，通过文件我们得知暂时是无法使用的，我本人也测试过了
     * @deprecated
     * @param {string} email
     * @param {string} password
     * @returns {Promise<any>}
     */
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

    /**
     * 手机登录，可以使用
     * @param {string} phone
     * @param {string} password
     * @returns {Promise<any>}
     */
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

    /**
     * 刷新登录，刷新内部存储的 cookie 信息
     * @returns {Promise<any>}
     */
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
