import { LoginNeededError } from './lib/error'
import { createWebAPIRequest } from './lib/request'

export class MusicClient {
    cookie: string[] = []

    get isLogin(): boolean {
        return Array.isArray(this.cookie) && this.cookie.length > 1
    }

    async checkLogin(): Promise<void> {
        if (!this.isLogin) {
            throw new LoginNeededError()
        }
    }

    async request(host: string, path: string, method: string, payload: any = {
        csrf_token: '',
    }) {
        return (await createWebAPIRequest(host, path, method, payload, this.cookie)).data
    }

    async requestWithSetCookie(host: string, path: string, method: string, payload: any = {
        csrf_token: '',
    }) {
        const {data, cookie} = await createWebAPIRequest(host, path, method, payload, this.cookie)
        this.cookie = cookie
        return data
    }
}
