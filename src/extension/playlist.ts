import { MusicClient } from '../client'

export enum PlaylistOperation {
    DELETE = 'del',
    ADD = 'add',
}

declare module '../client' {
    interface MusicClient {
        getPlaylistInfo(id: number): Promise<any>
        doPlaylistTrack(pid: number, mid: number, operation?: PlaylistOperation): Promise<any>
        getPlaylistCatalogue(): Promise<any> // 获取歌单的种类
        getPlaylistHotTag(): Promise<any> // 获取歌单热门标签
    }
}

MusicClient.prototype.getPlaylistInfo = async function(id: number) {
    return await this.request(
        'music.163.com',
        '/weapi/v3/playlist/detail',
        'POST',
        {
            id,
            csrf_token: '',
            n: 100000,
        },
    )
}

MusicClient.prototype.doPlaylistTrack = async function(
    pid: number,
    mid: number,
    op: PlaylistOperation = PlaylistOperation.ADD,
) {
    await this.checkLogin()
    return await this.request(
        'music.163.com',
        '/weapi/playlist/manipulate/tracks',
        'POST',
        {
            op,
            pid,
            csrf_token: '',
            trackIds: JSON.stringify([mid]),
            tracks: mid,
        },
    )
}

MusicClient.prototype.getPlaylistCatalogue = async function() {
    return await this.request(
        'music.163.com',
        '/weapi/playlist/catalogue',
        'POST',
    )
}

MusicClient.prototype.getPlaylistHotTag = async function() {
    return await this.request(
        'music.163.com',
        '/weapi/playlist/hottags',
        'POST',
        {},
    )
}
