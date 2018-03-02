import { BaseClient } from '../client'

export class MvExtClient extends BaseClient {
    /**
     * 获取 MV 信息
     *
     * 数据包含 MV 名字，歌手，发布时间，mv 视频地址等数据
     * 其中 MV 视频网易做了防盗链处理，不能直接获取，需要添加 referer: 'http://music.163.com/'
     * 更多内容请查看 [Code](https://github.com/Binaryify/NeteaseCloudMusicApi/blob/master/router/mv_url.js#L8)
     *
     * @param {number} mvid MV 的 ID
     * @returns {Promise<any>}
     */
    async getMvInfo(mvid: number) {
        return await this.request(
            'music.163.com',
            `/weapi/mv/detail`,
            'POST',
            {
                id: mvid,
            },
        )
    }
}
