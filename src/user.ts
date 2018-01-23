/**
 * 存储于用户相关的数据
 */

export class User {
    info: any
    cookie: string[]

    get id(): number {
        return this.info.profile.userId
    }

    get nickname(): string {
        return this.info.profile.nickname
    }

    get avatarUrl(): string {
        return this.info.profile.avatarUrl
    }

    get signature(): string {
        return this.info.profile.signature
    }

    constructor(store: any) {
        this.info = store.data
        this.cookie = store.cookie
    }

    toJSON() {
        return {
            cookie: this.cookie,
            data: this.info,
        }
    }
}
