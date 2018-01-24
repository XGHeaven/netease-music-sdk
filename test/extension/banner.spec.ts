import { MusicClient } from '../../src'

const client = new MusicClient()

it('getBanner', async () => {
    const data = await client.getBanner()
    expect(data).toHaveProperty('banners')
})
