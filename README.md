# Netease-Music-SDK

[![npm](https://img.shields.io/npm/v/netease-music-sdk.svg?style=flat-square)](https://github.com/XGHeaven/netease-music-sdk)
[![npm](https://img.shields.io/npm/dw/netease-music-sdk.svg?style=flat-square)](https://www.npmjs.com/package/netease-music-sdk)

网易云音乐 Node.js 版本 SDK，反正估计只有国内会用，我也就懒得用英文了。

由于发现市面上很多类似的 API 都是提供的 API 服务，而不是说 SDK，或者是很多都年久失修，所以才诞生了这个项目。
希望提供纯净可靠方便的 Node.js SDK，方便其他人进行二次开发。

本项目所有的接口来源于 [NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)，希望大家可以支持原作者。
本人只是在上面的基础上进行了相关的封装和抽离。如果发现接口有问题，请先向原作者提交 issue，然后跟我说明，我会跟进。

## 进度

- [x] 专辑（已单测）
- [x] 歌手（已单测）
- [x] 轮播图（已单测）
- [x] 评论
- [x] 电台（已单测）
- [x] 登录
- [x] 音乐（已单测）
- [x] 个人推荐（已单测）
- [x] 歌单
- [x] 推荐系统
- [x] 搜索（已单测）
- [x] 相似推荐（已单测）
- [x] 最热（已单测）
- [x] 用户
- [x] MV（已单测）

## 安装

```bash
npm install netease-music-sdk
```

## Quick Start

使用很简单，直接引入 `MusicClient` 然后实例化之后就可以使用了。
采用 Typescript 开发，并且 Document In Code，更多介绍，请查看 [SDK 文档](#API) 以及 `.d.ts`。

> 有一些请求接口需要登录之后才能访问，所以请在调用登录之后访问这些接口，否则会报错。

```typescript
const { MusicClient } = require('netease-music-sdk')
const client = new MusicClient()

client.getPlaylistCatalogue().then(cate => {
    // blah blah
})

// 或者可以登录之后操作与用户相关的内容，现在暂时只能用手机号登录
// 邮箱登录需要等原作者修复，修复之后我会自动跟进

client.phoneLogin('phone', 'pwd').then(() => {
    // 当用户登录成功之后，会将 cookie 保存到 client.cookie
    // 如果需要，请大家手动将 cookie dump 到本地
    return client.getPersonalFM()
}).then(fm => {
    console.dir(fm)
}).catch(e => {
    // 登录失败啊，需要登录权限啊，等等错误
})
```

### 登录与恢复

因为对于网易云来说，用户的登录与管理是至关重要的一件事情，通过 `client.phoneLogin` 或者 `client.emailLogin` 登录。
之后可以通过 `client.user` 来获取一些用户信息，比如 `id`，昵称等。更多请查看 docs。

> `client.user` 只有在登录之后才有效，否则会是 undefined

当你再次声明一个新的对象的时候，可能需要恢复登录信息，那么可以通过将 `const store = oldClient.user.toJSON()` 导出登录信息。
在新的对象上调用 `newClient.load(store)` 恢复登录信息。调用 `load` 之后也会让 `client.user` 可用。

## API

SDK 接口文档： [http://netease-music-sdk.xgheaven.com](http://netease-music-sdk.xgheaven.com)

## ChangeLog

[ChangeLog](CHANGELOGS.md)

## Thanks

欢迎提交 issue 已经 PR
