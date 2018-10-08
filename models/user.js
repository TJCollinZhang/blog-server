// 权限和用户数据模型
import mongoose from 'mongoose'
// import crypto from 'crypto'
import config from '../config'

const userSchema = new mongoose.Schema({
	// 名字
	name: { type: String, default: 'collin' },

	username: {
		type: String,
		default: config.USER.defaultUsername
	},

	// 签名
	slogan: { type: String, default: '' },

	// 头像
	gravatar: { type: String, default: '' },

	// 密码
	password: { 
		type: String,
		default: config.USER.defaultPassword
	},

	// role
	role: { type: Number, default: 1 }
})

const User = mongoose.model('User', userSchema)
const a = User

// export
export default User
