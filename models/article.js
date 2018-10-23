import mongoose from 'mongoose'

const localDate = () => {
	let d = new Date();
	d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
	return d
}


const articleSchema = new mongoose.Schema({
	title: {
		type: String,
		default: ''
	},
	tags: {
		type: [{
			type: mongoose.Schema.ObjectId,
			ref: 'Tag'
		}]
	},
	abstract: {
		type: String,
		default: ''
	},
	content: {
		type: String,
		default: ''
	},
	updatedAt: {
		type: Date, default: localDate
	}
})


const Article = mongoose.model('Article', articleSchema)
export default Article