import {insertArticle} from "../controllers/article";
import { controller, put, del, post, get, required } from '../decorator'
import {resErr, resSuccess} from '../utils/resHandle'
import config from '../config'

@controller(`${config.APP.root_path}/article`)
export class articleController {
    @post('saveArticle')
    @required({body: ['title', 'abstract', 'tags', 'content']})
    async saveArticle(ctx, next) {
        const {title, abstract, tags, content} = ctx.request.body
        try {
            let res = await insertArticle({title, abstract, tags, content})
            resSuccess({ctx: ctx,message: '插入文章成功', result: res})
        } catch (e) {
            resErr({ctx: ctx,message: '插入文章失败', err: e})
        }
    }
}