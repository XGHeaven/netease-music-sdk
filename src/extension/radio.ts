import { BaseClient } from '../client'

export class RadioExtClient extends BaseClient {
    /**
     * 获取电台分类
     * @returns {Promise<any>}
     */
    async getRadioCategory() {
        return await this.request(
            'music.163.com',
            '/weapi/djradio/category/get',
            'POST',
        )
    }

    /**
     * 获取推荐电台，或者根据输入的分类 ID 获取对应分类的推荐电台
     * @param {number} cid category ID
     * @returns {Promise<any>}
     */
    async getRadioRecommend(cid: number = 0) {
        if (!cid) {
            return await this.request(
                'music.163.com',
                '/weapi/djradio/recommend/v1',
                'POST',
            )
        }

        return await this.request(
            'music.163.com',
            '/weapi/djradio/recommend',
            'POST',
            {
                cateId: cid,
                csrf_token: '',
            },
        )
    }

    /**
     * 获取电台的信息
     * @param {number} rid
     * @returns {Promise<any>}
     */
    async getRadioInfo(rid: number) {
        return await this.request(
            'music.163.com',
            '/weapi/djradio/get',
            'POST',
            {
                csrf_token: '',
                id: rid,
            },
        )
    }

    /**
     * 获取电台的节目
     * @param {number} rid
     * @param {boolean} asc 是否为升序，默认是升序
     * @param {number} limit
     * @param {number} offset
     * @returns {Promise<any>}
     */
    async getRadioProgram(
        rid: number,
        asc: boolean = true,
        limit: number = 30,
        offset: number = 0,
    ) {
        return await this.request(
            'music.163.com',
            '/weapi/dj/program/byradio',
            'POST',
            {
                asc,
                limit,
                offset,
                csrf_token: '',
                radioId: rid,
            },
        )
    }

    /**
     * 获取电台某个节目的信息
     * @param {number} pid
     * @returns {Promise<any>}
     */
    async getRadioProgramInfo(pid: number) {
        return await this.request(
            'music.163.com',
            '/weapi/dj/program/detail',
            'POST',
            {
                csrf_token: '',
                id: pid,
            },
        )
    }
}
