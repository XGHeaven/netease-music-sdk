import { MusicClient } from '../client'

export enum UserRecordType {
    WEEK = 1,
    ALL = 0,
}

declare module '../client' {
    interface MusicClient {
        userDetail(uid: number): Promise<any>
        userSubcount(): Promise<any>
        userPlaylist(uid: number, limit?: number, offset?: number): Promise<any>
        userDj(uid: number, limit?: number, offset?: number): Promise<any>
        userFollows(uid: number, limit?: number, offset?: number): Promise<any>
        userFolloweds(uid: number, limit?: number, offset?: number): Promise<any>
        userEvent(uid: number): Promise<any>
        userRecord(uid: number, type?: UserRecordType): Promise<any>
    }
}

MusicClient.prototype.userDetail = async function(uid: number) {
    await this.checkLogin()
    return await this.request(
        'music.163.com',
        `/weapi/v1/user/detail/${uid}`,
        'POST',
    )
}

MusicClient.prototype.userSubcount = async function() {
    await this.checkLogin()
    return await this.request(
        'music.163.com',
        '/weapi/subcount',
        'POST',
    )
}

MusicClient.prototype.userPlaylist = async function(uid: number, limit: number = 30, offset: number = 0) {
    await this.checkLogin()
    return await this.request(
        'music.163.com',
        '/weapi/user/playlist',
        'POST',
        {
            csrf_token: '',
            limit, // 貌似无效
            offset,
            uid,
        },
    )
}

MusicClient.prototype.userDj = async function(uid: number, limit: number = 30, offset: number = 0) {
    await this.checkLogin()
    return await this.request(
        'music.163.com',
        `/weapi/dj/program/${uid}`,
        'POST',
        {
            csrf_token: '',
            limit,
            offset,
        },
    )
}

MusicClient.prototype.userFollows = async function(uid: number, limit: number = 30, offset: number = 0) {
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

MusicClient.prototype.userFolloweds = async function(uid: number, limit: number = 30, offset: number = 0) {
    await this.checkLogin()
    return await this.request(
        'music.163.com',
        `/weapi/user/getfolloweds/`,
        'POST',
        {
            csrf_token: '',
            limit,
            offset,
            userId: uid,
        },
    )
}

MusicClient.prototype.userEvent = async function(uid: number) {
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

MusicClient.prototype.userRecord = async function(uid: number, type: UserRecordType = UserRecordType.WEEK) {
    await this.checkLogin()
    return await this.request(
        'music.163.com',
        `/weapi/v1/play/record`,
        'POST',
        {
            csrf_token: '',
            type,
            uid, // 用户 id
        },
    )
}
