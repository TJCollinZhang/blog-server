'use strict'

import mongoose from 'mongoose'
import config from '../config'
import initAdmin from './initAdmin'

export default function () {
	mongoose.connect(config.Mongo.uri,{ useNewUrlParser: true }).then(
		() => {
			console.log('数据库连接成功!');
			initAdmin()
		},
		err => {
			console.log('数据库连接失败: ',err);
		}
	);
	return mongoose
}