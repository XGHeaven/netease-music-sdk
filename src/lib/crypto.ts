import * as bigInt from 'big-integer'
import * as crypto from 'crypto'

const defaultModulus =
    '00e0b509f6259df8642dbc35662901477df22677ec152b5ff68ace615bb7b725152b3ab17a876aea8a5aa76d2e417629e' +
    'c4ee341f56135fccf695280104e0312ecbda92557c93870114af6c9d05c4f7f0c3685b7a46bee255932575cce10b424d8' +
    '13cfe4875d3e82047b97ddef52741d546b8e289dc6935b3ece0462db0a22b8e7'
const defaultPubKey = '010001'
const nonce = '0CoJUm6Qyw8W8jud'
const keys = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

declare global {
    interface String {
        hexEncode(): string
    }
}

String.prototype.hexEncode = function() {
    let hex
    let i

    let result = ''
    for (i = 0; i < this.length; i++) {
        hex = this.charCodeAt(i).toString(16)
        result += ('' + hex).slice(-4)
    }
    return result
}

function createSecretKey(size: number) {
    let key = ''
    for (let i = 0; i < size; i++) {
        let pos = Math.random() * keys.length
        pos = Math.floor(pos)
        key = key + keys.charAt(pos)
    }
    return key
}

function aesEncrypt(text: string, secKey: string): string {
    const lv = new Buffer('0102030405060708', 'binary')
    const secKeyBuf = new Buffer(secKey, 'binary')
    const cipher = crypto.createCipheriv('AES-128-CBC', secKeyBuf, lv)
    let encrypted = cipher.update(text, 'utf8', 'base64')
    encrypted += cipher.final('base64')
    return encrypted
}

function zfill(str: string, size: number) {
    while (str.length < size) {
        str = '0' + str
    }
    return str
}

function rsaEncrypt(text: string, pubKey: string, modulus: string) {
    text = text.split('').reverse().join('')
    const biText = bigInt(new Buffer(text).toString('hex'), 16)
    const biEx = bigInt(pubKey, 16)
    const biMod = bigInt(modulus, 16)
    const biRet = biText.modPow(biEx, biMod)
    return zfill(biRet.toString(16), 256)
}

export function Encrypt(obj: any) {
    const text = JSON.stringify(obj)
    const secKey = createSecretKey(16)
    const encText = aesEncrypt(aesEncrypt(text, nonce), secKey)
    const encSecKey = rsaEncrypt(secKey, defaultPubKey, defaultModulus)
    return {
        encSecKey,
        params: encText,
    }
}
