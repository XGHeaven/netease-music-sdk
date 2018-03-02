import { MusicClient } from '../../src'

const client = new MusicClient()

const mvid = 5382080 // 告白气球

it('getMvInfo', async () => {
    const mvinfo = await client.getMvInfo(mvid)
    expect(mvinfo).toHaveProperty('data')
    expect(mvinfo.data.name).toEqual('告白气球')
})
