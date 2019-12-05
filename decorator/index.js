'use strict'

import Router from 'koa-router'
import {resolve} from 'path'
import glob from 'glob'
import R from 'ramda'
import _ from 'lodash'
import {resErr, resSuccess} from "../utils/resHandle";
import multer from 'koa-multer'
import path from 'path'

export let routersMap = new Map()
export const symbolPrefix = Symbol('prefix')
export const isArray = v => _.isArray(v) ? v : [v]
export const normalizePath = path => path.startsWith('/') ? path : `/${path}`



export default class Route {
	constructor(app, apiPath) {
		this.app = app
		this.router = new Router()
		this.apiPath = apiPath
	}

	init() {
		glob.sync(resolve(this.apiPath, './*.js')).forEach(require)

		for (let [conf, controller] of routersMap) {
			const controllers = isArray(controller)
			let prefixPath = conf.target[symbolPrefix]
			if (prefixPath) prefixPath = normalizePath(prefixPath)

			const routerPath = prefixPath + conf.path

			// 由于在使用时增加了检测路径的中间件，需要解构 ...controller
			this.router[conf.method](routerPath, ...controllers)
		}

		//特殊处理upload函数
		let storage = multer.diskStorage({
			destination: path.resolve('upload/images/'),
			filename: function (req, file, cb) {
				var fileFormat = (file.originalname).split(".");
				cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
			}
		});
		let upload = multer({ storage: storage});
		this.router.post('/api/img', upload.single('file'), async ctx => {
			if (ctx.req.file){
				resSuccess({ctx:ctx, message:"文件上传成功", result: {filename: ctx.req.file.filename}})
			} else {
				resErr({ctx: ctx, message:"文件上传失败"})
			}
		});
		this.app.use(this.router.routes())
		this.app.use(this.router.allowedMethods())
	}
}

export const router = conf => (target, key, desc) => {
	conf.path = normalizePath(conf.path)

	//由于前面的检测必要参数注入，这里的target[key]是
	routersMap.set({
		target: target,
		...conf
	}, target[key])
}
// controller装饰器
export const controller = path => target => target.prototype[symbolPrefix] = path

export const get = path => router({
	method: 'get',
	path: path
})


export const post = path => router({
	method: 'post',
	path: path
})

export const put = path => router({
	method: 'put',
	path: path
})

export const del = path => router({
	method: 'delete',
	path: path
})

const decorate = (args, middleware) => {
	let [target, key, descriptor] = args

	target[key] = isArray(target[key])
	target[key].unshift(middleware)

	return descriptor
}

export const convert = middleware => (...args) => decorate(args, middleware)
// required装饰器
export const required = rules => convert(async (ctx, next) => {
	let errors = []

	const passRules = R.forEachObjIndexed(
		(value, key) => {
			errors = R.filter(i => !R.has(i, ctx.request[key]))(value)
			console.log('val', value, 'key', key)
			// if (ctx.request.method === 'GET') {
			// 	errors = R.filter(i => !R.has(i, ctx.request[key]))(value)
			// } else {
			// 	try {
			// 		errors = R.filter(i => !R.has(i, ctx.request[key]))(value)
			// 	} catch (e) {
			// 		ctx.status = 400
			// 		ctx.body = e
			// 	}
			// }
		}
	)

	passRules(rules)

	if (errors.length) {
		// ctx.throw(400, `${errors.join(', ')} 参数缺失`)
		ctx.status = 400
		ctx.body = `${errors.join(', ')} 参数缺失`
		return false
	}


	await next()
})

