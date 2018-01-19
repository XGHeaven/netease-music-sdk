# Netease-Music-SDK

[![npm](https://img.shields.io/npm/v/netease-music-sdk.svg?style=flat-square)](https://github.com/XGHeaven/netease-music-sdk)
[![npm](https://img.shields.io/npm/dw/netease-music-sdk.svg?style=flat-square)](https://www.npmjs.com/package/netease-music-sdk)

网易云音乐 Node.js 版本 SDK，反正估计只有国内会用，我也就懒得用英文了。

由于发现市面上很多类似的 API 都是提供的 API 服务，而不是说 SDK，或者是很多都年久失修，所以才诞生了这个项目。
希望提供纯净可靠方便的 Node.js SDK，方便其他人进行二次开发。

本项目所有的接口来源于 [NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)，希望大家可以支持原作者。
本人只是在上面的基础上进行了相关的封装和抽离。如果发现接口有问题，请先向原作者提交 issue，然后我这边会自动跟进。

## 安装

```bash
npm install netease-music-sdk
```

## 使用

使用很简单，直接引入然后开始使用，由于我采用 Typescript 开发，所以提示会很完全，可以放心开发。

直接实例化对象之后调用对应方法即可。

```typescript
const {MusicClient} = require('netease-music-sdk')
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

## 进度

- [x] 专辑
- [x] 歌手
- [ ] 轮播图
- [x] 评论
- [ ] 电台
- [x] 登录
- [ ] 歌词
- [x] 音乐
- [x] 个人推荐
- [x] 歌单
- [x] 推荐系统
- [x] 搜索（已测）
- [ ] 相似查找
- [ ] 最热
- [x] 用户

## Thanks

