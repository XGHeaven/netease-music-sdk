import { createWebAPIRequest } from './lib/request'

export class MusicClient {
    public cookie = ''

    public get isLogin(): boolean {
        return !!this.cookie
    }

    public async checkLogin(): Promise<void> {
        if (!this.isLogin) {
            throw new Error('need login')
        }
    }

    public async request(host: string, path: string, method: string, payload: any = {
        csrf_token: '',
    }) {
        return (await createWebAPIRequest(host, path, method, payload, this.cookie)).data
    }

    public async requestWithSetCookie(host: string, path: string, method: string, payload: any = {
        csrf_token: '',
    }) {
        const {data, cookie} = await createWebAPIRequest(host, path, method, payload, this.cookie)
        this.cookie = cookie
        return data
    }
}
