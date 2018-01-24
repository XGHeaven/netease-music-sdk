import { BaseClient } from '../client'

/**
 * @internal
 */
export enum UserRecordType {
    WEEK = 1,
    ALL = 0,
}

export class UserExtClient extends BaseClient {

    async getUserDetail(uid: number) {
        await this.checkLogin()
        return await this.request(
            'music.163.com',
            `/weapi/v1/user/detail/${uid}`,
            'POST',
        )
    }

    async getUserSubcount() {
        await this.checkLogin()
        return await this.request(
            'music.163.com',
            '/weapi/subcount',
            'POST',
        )
    }

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
