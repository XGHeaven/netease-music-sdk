import { MusicClient } from '../client'

declare module '../client' {
    interface MusicClient {
        getBanner(): Promise<any>
    }
}

MusicClient.prototype.getBanner = async function() {
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
