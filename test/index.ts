import { MusicClient } from '../src'
import * as fs from 'fs-extra'
import * as path from 'path'

let config: any
const configPath = path.join(__dirname, 'config.json')

export async function getClient(): Promise<MusicClient> {
    return new MusicClient()
}

export async function getLoginedClient(): Promise<MusicClient> {
    if (!config) {
        if (fs.pathExists(path.join(__dirname, 'config.json'))) {
            config = await fs.readJSON(path.join(__dirname, 'config.json'))
        } else {
            throw new Error('缺少 config.json 文件')
        }
    }
    const client = new MusicClient()
    if (config.cookie) {
        client.cookie = config.cookie
        return client
    }
    await client.phoneLogin(config.account.phone.user, config.account.phone.pwd)
    config.cookie = client.cookie

    return client
}

export * from '../src'

process.on('beforeExit', () => {
    if (config) {
        fs.writeJSONSync(configPath, config)
    }
})
