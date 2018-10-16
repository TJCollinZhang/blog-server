import mongoose from 'mongoose'

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
    abstract: '',
    content: ''
})

const Article = mongoose.model('Article', articleSchema)
export default Article