import { BaseClient } from '../client'

export class AlibumExtClient extends BaseClient {
    /**
     * 获取专辑内容
     * @param {number} id 专辑的 ID
     * @returns {Promise<any>}
     */
    async getAlbum(id: number): Promise<any> {
        return await this.request(
            'music.163.com',
            `/weapi/v1/album/${id}`,
            'POST',
        )
    }
}
