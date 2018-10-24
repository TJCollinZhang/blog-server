import {
	insertArticle,
	deleteArticle,
	getArticleById,
	getArticleListByPage,
	updateArticle
} from "../controllers/article";
import {controller, put, del, post, get, required} from '../decorator'
import {resErr, resSuccess} from '../utils/resHandle'
import config from '../config'

@controller(`${config.APP.root_path}/article`)
export class articleController {
	@del('article')
	async delArticle(ctx, next) {
		try {
			let articleId = ctx.query.articleId
			if (articleId) {
				let res = await deleteArticle(articleId)
				return resSuccess({ctx: ctx, message: '删除文章成功', result: res})
			} else {
				resErr({ctx: ctx, message: '未获取到文章ID'})
			}

		} catch (e) {
			resErr({ctx: ctx, message: '删除文章失败', err: e})
		}
	}

	@get('article_list')
	async selectArticleListByPage(ctx, next) {
		try {
			let page = ctx.query.page || 0
			let res = await getArticleListByPage(page)
			return resSuccess({ctx: ctx, message: '获取文章列表成功', result: res})
		} catch (e) {
			resErr({ctx: ctx, message: '获取文章列表失败', err: e})
		}
	}

	@get('article')
	async selectArticleById(ctx, next) {
		try {
			let articleId = ctx.query.articleId
			if (articleId) {
				let res = await getArticleById(articleId)
				return resSuccess({ctx: ctx, message: '获取文章成功', result: res})
			} else {
				resErr({ctx: ctx, message: '未获取到文章ID'})
			}
		} catch (e) {
			resErr({ctx: ctx, message: '删除文章失败', err: e})
		}
	}


	@post('article')
	@required({body: ['title', 'abstract', 'tags', 'content']})
	async saveArticle(ctx, next) {
		const {title, abstract, tags, content} = ctx.request.body
		try {
			let res = await insertArticle({title, abstract, tags, content})
			resSuccess({ctx: ctx, message: '插入文章成功', result: res})
		} catch (e) {
			resErr({ctx: ctx, message: '插入文章失败', err: e})
		}
	}

	@put('article')
	@required({body: ['_id','title', 'abstract', 'tags', 'content']})
	async modifyArticle(ctx, next) {
		const {_id, title, abstract, tags, content, updatedAt} = ctx.request.body
		try {
			let res = await updateArticle({_id, title, abstract, tags, content, updatedAt})
			resSuccess({ctx: ctx, message: '修改文章成功', result: res})
		} catch (e) {
			resErr({ctx: ctx, message: '修改文章失败', err: e})
		}
	}
}