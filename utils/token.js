'use strict'
import jwt from 'jsonwebtoken'
import config from '../config'

const createToken = (userName) => {
	const token = jwt.sign({userName}, config.JWT.secret, {
		expiresIn: config.JWT.expiresIn
	});
	return token
}

const verifyToken = (token) => {
	if (!token) {
		return false
	}
	try {
		let result = jwt.verify(token, config.JWT.secret)
		return result
	}
	catch(err) {
		return false
	}
}

module.exports = {
	createToken,
	verifyToken
}
