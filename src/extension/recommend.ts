import { BaseClient } from '../client'

export class RecommendExtClient extends BaseClient {
    async getRecommendList() {
        await this.checkLogin()
        return await this.request(
            'music.163.com',
            '/weapi/v1/discovery/recommend/resource',
            'POST',
        )
    }

    async getRecommendSong(limit: number = 30, offset: number = 0) {
        await this.checkLogin()
        return await this.request(
            'music.163.com',
            '/weapi/v1/discovery/recommend/songs',
            'POST',
            {
                limit,
                offset,
                csrf_token: '',
                total: true,
            },
        )
    }
}
