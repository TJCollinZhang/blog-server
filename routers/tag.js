'use strict'

import {controller, put, del, post, get, required} from '../decorator'
import {resErr, resSuccess} from '../utils/resHandle'
import config from '../config'
import {insertTag, deleteTag, getTagListByPage} from '../controllers/tag'

@controller(`${config.APP.root_path}/tag`)
export class TagController {
	@post('tag')
	@required({body: ['tagName', 'description']})
	async saveTag(ctx, next) {
		try {
			let {tagName, description} = ctx.request.body
			let res = await insertTag({tagName, description})
			resSuccess({ctx: ctx, message: '新增标签成功', result: res})
		} catch (e) {
			resErr({ctx: ctx, message: '新增标签失败', err: e})
		}
	}

	@get('tag_list')
	async getTags(ctx, next) {
		try {
			const page = ctx.query.page || 1
			let res = await getTagListByPage(page)
			resSuccess({ctx: ctx, message: '查询标签列表成功', result: res})
		} catch (e) {
			resErr({ctx: ctx, message: '查询标签列表失败', err: e})
		}
	}

	@del('tag')
	async delTag(ctx,next) {
		try {
			let tagId = ctx.query.tagId
			if (tagId) {
				let res = await deleteTag(tagId)
				resSuccess({ctx: ctx, message: "删除标签成功", result: res})
			} else {
				resErr({ctx: ctx, message: "未获取到标签ID"})
			}
		}catch (e) {
			resErr({ctx: ctx, message: "删除标签失败", err: e})
		}

	}
}