'use strict'

import config from "../config";
import User from "../models/user"

export default async () => {
	const username = config.USER.defaultUsername;
	const password = config.USER.defaultPassword;
	let result = User.find().exec().then(
		(docs) => {
			if(docs.length === 0) {
				let user = new User({username: username, password: password, role: 100});
				user.save().then(
					(docs) => {
						console.log('存储成功')
					}
				).catch(
					(err) => {
						console.log(500, '服务器内部错误-存储admin错误！');
					}
				)
			}
		}
	).catch(
		(err) => {
			console.log('服务器内部错误-查找admin错误！', err);
		}
	)
	
}