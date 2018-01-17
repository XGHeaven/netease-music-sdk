import { MusicClient } from '../client'

declare module '../client' {
    interface MusicClient {
        playlistDetail(id: number): Promise<any>
    }
}

MusicClient.prototype.playlistDetail = async function(id: number) {
    return await this.request(
        'music.163.com',
        '/weapi/v3/playlist/detail',
        'POST',
        {
            csrf_token: '',
            id,
            n: 100000,
        },
    )
}
