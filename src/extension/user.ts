import { BaseClient } from '../client'

/**
 * @internal
 */
export enum UserRecordType {
    WEEK = 1,
    ALL = 0,
}

export enum UserGender {
    /**
     * 保密
     */
    SECRECY = 0,

    /**
     * 男
     */
    MALE = 1,

    /**
     * 女
     */
    FEMALE = 2,
}

/**
 * 更新用户信息参数结构
 */
export interface UserUpdate {
    /**
     * 用户性别
     */
    gender: UserGender,

    /**
     * 用户生日，unix 时间戳
     */
    birthday: number,

    /**
     * 用户昵称
     */
    nickname: string,

    /**
     * 省份代码
     */
    province: number,

    /**
     * 城市代码
     */
    city: number,

    /**
     * 用户的个性签名
     */
    signature: string,
}

export class UserExtClient extends BaseClient {
    /**
     * 更新用户信息
     * @param {UserUpdate} user
     * @returns {Promise<void>}
     */
    async updateUser(user: UserUpdate) {
        await this.checkLogin()
        await this.request(
            'music.163.com',
            '/weapi/user/profile/update',
            'POST',
            {
                avatarImgId: '',
                csrf_token: '',
                ...user,
            },
        )
    }

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
