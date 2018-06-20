import { MusicClient } from '../../src'

const client = new MusicClient()

const mvid = 5843433 // 厉害了我的国

it('getMvInfo', async () => {
    const mvinfo = await client.getMvInfo(mvid)
    expect(mvinfo).toHaveProperty('data')
    expect(mvinfo.data.name).toEqual('厉害了我的国')
})
