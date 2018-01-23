import { MusicClient } from '../../src'

const client = new MusicClient()

it('getAlbum', async () => {
    const data = await client.getAlbum(34720827) // 周杰伦的床边故事
    expect(data).toHaveProperty('songs')
    expect(data).toHaveProperty('album')
})
