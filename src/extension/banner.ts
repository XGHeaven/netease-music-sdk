import { BaseClient } from '../client'

export class BannerExtClient extends BaseClient {
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
