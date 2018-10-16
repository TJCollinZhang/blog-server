'use strict'

import { controller, put, del, post, get, required } from '../decorator'
import {resErr, resSuccess} from '../utils/resHandle'
import config from '../config'
import {insertTag, getTagList} from '../controllers/tag'

@controller(`${config.APP.root_path}/tag`)
export class TagController {
    @post('saveTag')
    @required({body: ['tagName', 'description']})
    async saveTag(ctx, next) {
        let {tagName, description} = ctx.request.body
        try {
            let res = insertTag({tagName, description})
            resSuccess({ctx: ctx, message: '插入标签成功', result: res})
        }catch (e) {
            resErr({ctx: ctx, message: '插入标签失败', err: e})
        }
    }

    @get('getTags')
    async getTags(ctx, next) {
        try {
           let res = await getTagList()
            resSuccess({ctx: ctx, message: '查询标签列表成功', result: res})
        }catch (e) {
            resErr({ctx: ctx, message: '查询标签列表失败', err: e})
        }
    }
}