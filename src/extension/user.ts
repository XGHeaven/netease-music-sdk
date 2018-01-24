import { BaseClient } from '../client'

/**
 * @internal
 */
export enum UserRecordType {
    WEEK = 1,
    ALL = 0,
}

export class UserExtClient extends BaseClient {
    /**
     * 获取用户信息
     * @param {number} uid
     * @returns {Promise<any>}
     */
    async getUserDetail(uid: number) {
        await this.checkLogin()
        return await this.request(
            'music.163.com',
            `/weapi/v1/user/detail/${uid}`,
            'POST',
        )
    }

    /**
     * 获取用户订阅数量
     * @returns {Promise<any>}
     */
    async getUserSubcount() {
        await this.checkLogin()
        return await this.request(
            'music.163.com',
            '/weapi/subcount',
            'POST',
        )
    }

    /**
     * 获取用户播放列表
     * @param {number} uid
     * @param {number} limit
     * @param {number} offset
     * @returns {Promise<any>}
     */
    async getUserPlaylist(uid: number, limit: number = 30, offset: number = 0) {
        await this.checkLogin()
        return await this.request(
            'music.163.com',
            '/weapi/user/playlist',
            'POST',
            {
                limit, // 貌似无效
                offset,
                uid,
                csrf_token: '',
            },
        )
    }

    /**
     * 获取用户的电台
     * @param {number} uid
     * @param {number} limit
     * @param {number} offset
     * @returns {Promise<any>}
     */
    async getUserDj(uid: number, limit: number = 30, offset: number = 0) {
        await this.checkLogin()
        return await this.request(
            'music.163.com',
            `/weapi/dj/program/${uid}`,
            'POST',
            {
                limit,
                offset,
                csrf_token: '',
            },
        )
    }

    /**
     * 获取用户关注列表
     * @param {number} uid
     * @param {number} limit
     * @param {number} offset
     * @returns {Promise<any>}
     */
    async getUserFollows(uid: number, limit: number = 30, offset: number = 0) {
        await this.checkLogin()
        return await this.request(
            'music.163.com',
            `/weapi/user/getfollows/${uid}`,
            'POST',
            {
                limit,
                offset,
                order: true,
            },
        )
    }

    /**
     * 获取用户粉丝列表
     * @param {number} uid
     * @param {number} limit
     * @param {number} offset
     * @returns {Promise<any>}
     */
    async getUserFolloweds(uid: number, limit: number = 30, offset: number = 0) {
        await this.checkLogin()
        return await this.request(
            'music.163.com',
            `/weapi/user/getfolloweds/`,
            'POST',
            {
                limit,
                offset,
                csrf_token: '',
                userId: uid,
            },
        )
    }

    /**
     * 获取用户动态
     * @param {number} uid
     * @returns {Promise<any>}
     */
    async getUserEvent(uid: number) {
        await this.checkLogin()
        return await this.request(
            'music.163.com',
            `/weapi/event/get/${uid}`,
            'POST',
            {
                csrf_token: '',
                getcounts: true,
                time: -1,
            },
        )
    }

    /**
     * 获取用户播放记录
     * @param {number} uid
     * @param {UserRecordType} type
     * @returns {Promise<any>}
     */
    async getUserRecord(uid: number, type: UserRecordType = UserRecordType.WEEK) {
        await this.checkLogin()
        return await this.request(
            'music.163.com',
            `/weapi/v1/play/record`,
            'POST',
            {
                type,
                uid, // 用户 id
                csrf_token: '',
            },
        )
    }

}
