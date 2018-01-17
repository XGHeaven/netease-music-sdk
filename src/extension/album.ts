import { MusicClient } from '../client'

declare module '../client' {
    interface MusicClient {
        getAlbum(id: number): Promise<any>
    }
}

MusicClient.prototype.getAlbum = async function(id: number) {
    return await this.request(
        'music.163.com',
        `/weapi/v1/album/${id}`,
        'POST',
    )
}
