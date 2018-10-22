import mongoose from 'mongoose'

const localDate = (v) => {
	const d = new Date(v || Date.now());
	d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
	return d;
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
	createAt: { type: Date, default: localDate()}
})



const Article = mongoose.model('Article', articleSchema)
export default Article