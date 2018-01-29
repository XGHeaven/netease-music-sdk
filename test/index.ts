import * as fs from 'fs-extra'
import * as path from 'path'
import { MusicClient } from '../src'

let config: any
const configPath = path.join(__dirname, 'config.json')

if (fs.pathExistsSync(configPath)) {
    config = fs.readJSONSync(configPath)
} else {
    throw new Error('缺少 config.json 文件，请将 config.default.json 复制为 config.json')
}

export async function getClient(): Promise<MusicClient> {
    return new MusicClient()
}

export async function getLoginedClient(): Promise<MusicClient> {
    const client = new MusicClient()
    if (config.store) {
        client.load(config.store)
        return client
    }
    await client.phoneLogin(config.account.phone.user, config.account.phone.pwd)
    config.store = client.user.toJSON()

    return client
}

process.on('exit', () => {
    fs.writeJSONSync(configPath, config)
})
