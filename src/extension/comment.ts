import { MusicClient } from '../client'

export enum ResourceType {
    SONG = 'R_SO_4_', // 歌曲
    MV = 'R_MV_5_', // MV
    PLAYLIST = 'A_PL_0_', // 歌单
    ALBUM = 'R_AL_3_', // 专辑
    DJ = 'A_DJ_1_', // 电台
}

declare module '../client' {
    interface MusicClient {
        getSongComment(id: number, limit?: number, offset?: number): Promise<any>
        getAlbumComment(id: number, limit?: number, offset?: number): Promise<any>
        getPlaylistComment(id: number, limit?: number, offset?: number): Promise<any>
        getMvComment(id: number, limit?: number, offset?: number): Promise<any>
        getDjComment(id: number, limit?: number, offset?: number): Promise<any>
        likeComment(rid: number, cid: number, type?: ResourceType, like?: boolean): Promise<any>
    }
}

MusicClient.prototype.getSongComment = async function(id: number, limit: number = 30, offset: number = 0) {
    return await this.request(
        'music.163.com',
        `/weapi/v1/resource/comments/R_SO_4_${id}/?csrf_token=`,
        'POST',
        {
            csrf_token: '',
            limit,
            offset,
            rid: id,
        },
    )
}

MusicClient.prototype.getAlbumComment = async function(id: number, limit: number = 30, offset: number = 0) {
    return await this.request(
        'music.163.com',
        `/weapi/v1/resource/comments/R_AL_3_${id}/?csrf_token=`,
        'POST',
        {
            csrf_token: '',
            limit,
            offset,
            rid: id,
        },
    )
}

MusicClient.prototype.getPlaylistComment = async function(id: number, limit: number = 30, offset: number = 0) {
    return await this.request(
        'music.163.com',
        `/weapi/v1/resource/comments/A_PL_0_${id}/?csrf_token=`,
        'POST',
        {
            csrf_token: '',
            limit,
            offset,
            rid: id,
        },
    )
}

MusicClient.prototype.getMvComment = async function(id: number, limit: number = 30, offset: number = 0) {
    return await this.request(
        'music.163.com',
        `/weapi/v1/resource/comments/R_MV_5_${id}/?csrf_token=`,
        'POST',
        {
            csrf_token: '',
            limit,
            offset,
            rid: id,
        },
    )
}

MusicClient.prototype.getDjComment = async function(id: number, limit: number = 30, offset: number = 0) {
    return await this.request(
        'music.163.com',
        `/weapi/v1/resource/comments/A_DJ_1_${id}/?csrf_token=`,
        'POST',
        {
            csrf_token: '',
            limit,
            offset,
            rid: id,
        },
    )
}

MusicClient.prototype.likeComment = async function(
    rid: number,
    cid: number,
    type: ResourceType = ResourceType.SONG,
    like: boolean = true,
) {
    const action = like ? 'like' : 'unlike'
    return await this.request(
        'music.163.com',
        `/weapi/v1/comment/${action}`,
        'POST',
        {
            commentId: cid,
            csrf_token: '',
            threadId: `${type}${rid}`,
        },
    )
}
