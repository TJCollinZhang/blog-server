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
	return await Article.findById(articleId,'-updatedAt')
}

export const getArticleListByPage = async (page) => {
	// let res_limit = await Article.find()
	let pipelineArr = [
		{
			$sort: {
				updatedAt: -1
			}
		},
		{
			$lookup: {
				from: "tags",
				localField: "tags",
				foreignField: '_id',
				as: 'tagArr'
			}

		},
		{
			$project: {
				title: 1,
				_id: 1,
				abstract: 1,
				tagArr: 1,
				updatedAt: {$dateToString: {format: "%Y-%m-%d %H:%M:%S", date: "$updatedAt"}}
			}
		}
	]
	if (page) {
		pipelineArr.push(
			{ $skip : 10 * (page - 1) },
			{ $limit : 10 }
		)
	}
	let res_limit = await Article.aggregate(pipelineArr)
	let total = await Article.countDocuments()
	return {total: total, res_limit: res_limit}
}



