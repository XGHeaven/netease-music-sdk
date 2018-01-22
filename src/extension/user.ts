import { MusicClient } from '../client'

export enum UserRecordType {
    WEEK = 1,
    ALL = 0,
}

declare module '../client' {
    interface MusicClient {
        getUserDetail(uid: number): Promise<any>
        getUserSubcount(): Promise<any>
        getUserPlaylist(uid: number, limit?: number, offset?: number): Promise<any>
        getUserDj(uid: number, limit?: number, offset?: number): Promise<any>
        getUserFollows(uid: number, limit?: number, offset?: number): Promise<any>
        getUserFolloweds(uid: number, limit?: number, offset?: number): Promise<any>
        getUserEvent(uid: number): Promise<any>
        getUserRecord(uid: number, type?: UserRecordType): Promise<any>
    }
}

MusicClient.prototype.getUserDetail = async function(uid: number) {
    await this.checkLogin()
    return await this.request(
        'music.163.com',
        `/weapi/v1/user/detail/${uid}`,
        'POST',
    )
}

MusicClient.prototype.getUserSubcount = async function() {
    await this.checkLogin()
    return await this.request(
        'music.163.com',
        '/weapi/subcount',
        'POST',
    )
}

MusicClient.prototype.getUserPlaylist = async function(uid: number, limit: number = 30, offset: number = 0) {
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

MusicClient.prototype.getUserDj = async function(uid: number, limit: number = 30, offset: number = 0) {
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

MusicClient.prototype.getUserFollows = async function(uid: number, limit: number = 30, offset: number = 0) {
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

MusicClient.prototype.getUserFolloweds = async function(uid: number, limit: number = 30, offset: number = 0) {
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

MusicClient.prototype.getUserEvent = async function(uid: number) {
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

MusicClient.prototype.getUserRecord = async function(uid: number, type: UserRecordType = UserRecordType.WEEK) {
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
