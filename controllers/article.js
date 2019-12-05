'use strict'
import Article from '../models/article';
import mongoose from 'mongoose'



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
	let id = mongoose.Types.ObjectId(articleId)
	let pipelineArr = [
		{
			$match: {
				_id: id
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
				tags: 1,
				content: 1,
				updatedAt: {$dateToString: {format: "%Y-%m-%d %H:%M:%S", date: "$updatedAt"}}
			}
		}
	]
	return await Article.aggregate(pipelineArr)
}

export const getArticleListByPage = async (page, keywords) => {
	// let res_limit = await Article.find()
	const keywordsReg = new RegExp(keywords, 'i')
	console.log('key', keywordsReg)
	let pipelineArr = [
		{
			$sort: {
				updatedAt: -1
			}
		},
		{
			$match: {
				$or: [
					{
						title: {$regex: keywordsReg}
					},{
					abstract: {$regex: keywordsReg}
					}
				]
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



