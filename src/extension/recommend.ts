import { MusicClient } from '../client'

declare module '../client' {
    interface MusicClient {
        getRecommendList(): Promise<void>
        getRecommendSong(limit?: number, offset?: number): Promise<void>
    }
}

MusicClient.prototype.getRecommendList = async function() {
    await this.checkLogin()
    return await this.request(
        'music.163.com',
        '/weapi/v1/discovery/recommend/resource',
        'POST',
    )
}

MusicClient.prototype.getRecommendSong = async function(limit: number = 30, offset: number = 0) {
    await this.checkLogin()
    return await this.request(
        'music.163.com',
        '/weapi/v1/discovery/recommend/songs',
        'POST',
        {
            csrf_token: '',
            limit,
            offset,
            total: true,
        },
    )
}
