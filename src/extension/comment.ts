import { BaseClient } from '../client'

/**
 * @internal
 */
export enum ResourceType {
    SONG = 'R_SO_4_', // 歌曲
    MV = 'R_MV_5_', // MV
    PLAYLIST = 'A_PL_0_', // 歌单
    ALBUM = 'R_AL_3_', // 专辑
    DJ = 'A_DJ_1_', // 电台
}

export class CommentExtClient extends BaseClient {
    async getSongComment(id: number, limit: number = 30, offset: number = 0) {
        return await this.request(
            'music.163.com',
            `/weapi/v1/resource/comments/R_SO_4_${id}/?csrf_token=`,
            'POST',
            {
                limit,
                offset,
                csrf_token: '',
                rid: id,
            },
        )
    }

    async getAlbumComment(id: number, limit: number = 30, offset: number = 0) {
        return await this.request(
            'music.163.com',
            `/weapi/v1/resource/comments/R_AL_3_${id}/?csrf_token=`,
            'POST',
            {
                limit,
                offset,
                csrf_token: '',
                rid: id,
            },
        )
    }

    async getPlaylistComment(id: number, limit: number = 30, offset: number = 0) {
        return await this.request(
            'music.163.com',
            `/weapi/v1/resource/comments/A_PL_0_${id}/?csrf_token=`,
            'POST',
            {
                limit,
                offset,
                csrf_token: '',
                rid: id,
            },
        )
    }

    async getMvComment(id: number, limit: number = 30, offset: number = 0) {
        return await this.request(
            'music.163.com',
            `/weapi/v1/resource/comments/R_MV_5_${id}/?csrf_token=`,
            'POST',
            {
                limit,
                offset,
                csrf_token: '',
                rid: id,
            },
        )
    }

    async getDjComment(id: number, limit: number = 30, offset: number = 0) {
        return await this.request(
            'music.163.com',
            `/weapi/v1/resource/comments/A_DJ_1_${id}/?csrf_token=`,
            'POST',
            {
                limit,
                offset,
                csrf_token: '',
                rid: id,
            },
        )
    }

    async doLikeComment(
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

}
