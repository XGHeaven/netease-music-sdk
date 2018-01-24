import { BaseClient } from '../client'

/**
 * 资源类型，你可以选择不同的资源的类型，比如歌曲，歌单等
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
    /**
     * 获取歌曲评论
     * @param {number} id
     * @param {number} limit
     * @param {number} offset
     * @returns {Promise<any>}
     */
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

    /**
     * 获取专辑评论
     * @param {number} id
     * @param {number} limit
     * @param {number} offset
     * @returns {Promise<any>}
     */
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

    /**
     * 获取歌单的评论
     * @param {number} id
     * @param {number} limit
     * @param {number} offset
     * @returns {Promise<any>}
     */
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

    /**
     * 获取 MV 的评论
     * @param {number} id
     * @param {number} limit
     * @param {number} offset
     * @returns {Promise<any>}
     */
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

    /**
     * 获取电台的评论
     * @param {number} id
     * @param {number} limit
     * @param {number} offset
     * @returns {Promise<any>}
     */
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

    /**
     * 喜欢某一条评论
     * @param {number} rid 资源的 ID，比如歌曲就是歌曲 ID，MV 就是 MV ID
     * @param {number} cid 评论 ID
     * @param {ResourceType} type 资源类型
     * @param {boolean} like 是喜欢还是取消喜欢
     * @returns {Promise<any>}
     */
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
