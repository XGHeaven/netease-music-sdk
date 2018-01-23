import { LoginNeededError } from './lib/error'
import { createWebAPIRequest } from './lib/request'
import { User } from './user'

export class MusicClient {
    /**
     * 用户信息
     */
    user: User

    get cookie() {
        return this.user && this.user.cookie ? this.user.cookie : []
    }

    get isLogin(): boolean {
        return !!this.user && Array.isArray(this.user.cookie) && this.user.cookie.length > 1
    }

    /**
     * 从存储当中恢复用户
     * @param store 用户的信息，用于恢复使用
     */
    load(store: any) {
        this.user = new User(store)
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
        const respData = await createWebAPIRequest(host, path, method, payload, this.cookie)
        this.user = new User(respData)
        return respData.data
    }
}
