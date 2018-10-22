'use strict'
import Article from '../models/article';


export const insertArticle = async (article) => {
	let res = await (new Article(article)).save()
	return res
}

export const deleteArticle = async (articleId) => {
	return Article.findByIdAndRemove(articleId)
}

export const updateArticle = async (article) => {
	return await Article.updateOne({_id: article._id}, article)
}

export const getArticleById = async (articleId) => {
	return await Article.findOne({_id: articleId})
}

export const getArticleListByPage = async (page) => {
	let res_limit = await Article.find()
	let total = res_limit.length
	if (page) {
		res_limit = await Article.find().sort({"_id": 1}).skip(10 * (page - 1)).limit(10)
	}
	res_limit.map((doc) => {
		let createAt = doc._doc.createAt
		doc._doc.createAt = createAt.toISOString().replace(/[A-Z]/g,' ').slice(0,-5)
		return doc
	})
	return {total: total, res_limit: res_limit}
}



