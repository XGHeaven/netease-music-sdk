import { LoginNeededError } from './lib/error'
import { createWebAPIRequest } from './lib/request'
import { User } from './user'

export class BaseClient {
    /**
     * 用户信息，当手动调用登录或者 load 之后，此对象会自动实例化
     * 通过调用 `user.toJSON()` 获取可以用于存储的对象，当下次实例化的时候，通过 `client.load` 恢复登录状态
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
