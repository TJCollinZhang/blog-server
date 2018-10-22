import mongoose from 'mongoose'

const tagSchema = new mongoose.Schema({
	tagName: {
		type: String,
		default: '',
		unique: true
	},
	description: {
		type: String,
		default: ''
	}
})

const Tag = mongoose.model('Tag', tagSchema)

export default Tag