'use strict'
import {verifyToken} from '../utils/token'

import {resErr, resSuccess} from '../utils/resHandle'


export default async (ctx, next) => {
	if (!ctx.request.url.includes('login') && !Object.is(ctx.request.method, 'GET') && !verifyToken(ctx.request)) {
		ctx.throw(401, {code: -2, message: '身份验证失败！'});
	}
	await next();


}
