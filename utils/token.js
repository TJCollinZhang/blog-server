'use strict'
import jwt from 'jsonwebtoken'
import config from '../config'

//验证Auth
const authToken = (req) => {
	if (req.headers && req.headers.authorization) {
		const auth = req.headers.authorization.split(' ')
		if (Object.is(auth.length, 2) && Object.is(auth[0], 'Collin')) {
			return auth[1]
		}
	}
}

const verifyToken = (req) => {
	const token = authToken(req)
	if (token) {
		try {
			let decodedToken = jwt.verify(token, config.JWT.secret)
			if (decodedToken.exp > Math.floor(Date.now() / 1000)) {
				return true
			}
		}
		catch (err) {
			console.log(err)
			return false
		}
	}
	return false
}

module.exports = {
	verifyToken
}
