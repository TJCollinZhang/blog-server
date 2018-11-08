'use strict'

const REDIS = {
	port: '6379',
	server: '127.0.0.1'
}

const JWT = {
	secret: 'collin',
	expiresIn: 60*60*24// 授权时效24小时
}

const USER = {
	defaultUsername: 'collin',
	defaultPassword: 'collin',
    jwtTokenSecret: 'collin'
}

const APP = {
	port: '3000',
	root_path: 'api'
}

const Mongo = {
	uri: 'mongodb://127.0.0.1:27017/my_blog',
}



export default {
	REDIS,
	JWT,
	USER,
	Mongo,
	APP
}