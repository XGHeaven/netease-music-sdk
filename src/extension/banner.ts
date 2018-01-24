import { BaseClient } from '../client'

export class BannerExtClient extends BaseClient {
    /**
     * 获取轮播图，但是只能获取旧的信息
     * @returns {Promise<any>}
     */
    async getBanner() {
        return await this.request(
            'music.163.com',
            '/api/v2/banner/get',
            'POST',
            {
                csrf_token: '',
                timeStamp: `0${new Date()}`,
            },
        )
    }
}
