import { MusicClient } from '../../src'
import { getClient } from '../index'

let client: MusicClient

beforeAll(async () => {
    client = await getClient()
})

it('getRadioCategory', async () => {
    const data = await client.getRadioCategory()
    expect(data).toHaveProperty('categories')
})

describe('getRadioRecommend', () => {
    it('without category', async () => {
        const data = await client.getRadioRecommend()
        expect(data).toHaveProperty('djRadios')
    })

    it('with category', async () => {
        const {categories: cates} = await client.getRadioCategory()
        const data = await client.getRadioRecommend(cates[0].id)
        expect(data).toHaveProperty('djRadios')
        expect(data.djRadios.map((dj: any) => dj.category)).toEqual(data.djRadios.map(() => cates[0].name))
    })
})

it('getRadioInfo', async () => {
    const data = await client.getRadioInfo(335965054) // 林非的唱片私藏馆
    expect(data).toHaveProperty('djRadio')
})

it('getRadioProgram', async () => {
    const data = await client.getRadioProgram(335965054)
    expect(data).toHaveProperty('more')
    expect(data).toHaveProperty('programs')
})

it('getRadioProgramInfo', async () => {
    const {programs} = await client.getRadioProgram(335965054)
    const data = await client.getRadioProgramInfo(programs[0].id)
    expect(data).toHaveProperty('program')
    expect(data.program.name).toEqual(programs[0].name)
})
