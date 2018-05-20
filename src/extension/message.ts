import { BaseClient } from '../client'

export class MessageExtClient extends BaseClient {
    /**
     * 发送私信
     *
     * 说明：登陆后调用此接口 , 传入用户 id 和要发送的信息, 可以发送私信,返回内容为历史私信,包含带歌单的私信信息(注:不能发送私信给自己)
     * @param {number | number[]} userIds 用户 ID
     * @param {string} text 要发送的消息
     * @returns {Promise<any>}
     */
    async sendTextMessage(userIds: number | number[], text: string) {
        if (!Array.isArray(userIds)) {
            userIds = [userIds]
        }

        await this.checkLogin()
        return await this.request(
            'music.163.com',
            '/weapi/msg/private/send',
            'POST',
            {
                userIds,
                csrf_token: '',
                msg: text,
                type: 'text',
            },
        )
    }

    /**
     * 发送私信(带歌单)
     *
     * 说明 : 登陆后调用此接口 , 传入用户 id 和要发送的信息和歌单 id, 可以发送带歌单的私信(注:不能发送重复的歌单)
     * @param {number | number[]} userIds 用户 ID
     * @param {string} text 要发送的私信
     * @param {number} playlistId 歌单列表
     * @returns {Promise<any>}
     */
    async sendPlaylistMessage(userIds: number | number[], text: string, playlistId: number): Promise<any> {
        if (!Array.isArray(userIds)) {
            userIds = [userIds]
        }

        await this.checkLogin()
        return await this.request(
            'music.163.com',
            '/weapi/msg/private/send',
            'POST',
            {
                userIds,
                csrf_token: '',
                id: playlistId,
                msg: text,
                type: 'playlist',
            },
        )
    }
}
