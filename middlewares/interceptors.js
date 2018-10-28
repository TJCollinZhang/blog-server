'use strict'
import {verifyToken} from '../utils/token'

import {resErr, resSuccess} from '../utils/resHandle'


export default async (ctx, next) => {
	// const allowedOrigins = ['https://blog.naice.me', 'https://blog.admin.naice.cn', 'file://'];
	// const origin = ctx.request.headers.origin || '';
	// if (allowedOrigins.includes(origin) || origin.includes('localhost')) {
	// 	ctx.set('Access-Control-Allow-Origin', origin);
	// };
	// ctx.set('Access-Control-Allow-Origin', origin);

	// ctx.set({
	// 	'Access-Control-Allow-Credentials':true,
	// 	'Access-Control-Allow-Headers': 'Authorization, Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With',
	// 	'Access-Control-Allow-Methods': 'PUT,PATCH,POST,GET,DELETE,OPTIONS',
	// 	'Access-Control-Max-Age': '1728000',
	// 	// 'Content-Type': 'application/json;charset=utf-8',
	// 	'X-Powered-By': 'collin_blog 1.0.0'
	// });

    // OPTIONS
    // if (ctx.request.method == 'OPTIONS') {
    //     ctx.status = 200;
    //     return false;
    // };

	// let token = ctx.request.headers['authorization'];
	let verified = verifyToken(ctx.request)
		if( !ctx.request.url.includes('login') && !Object.is(ctx.request.method, 'GET') && !verifyToken(ctx.request) ) {
			ctx.throw(401,{ code: -2, message: '身份验证失败！'});
			// ctx.status = 401
			// ctx.body = {message: "身份验证失败！"}
		}

	await next();




}
