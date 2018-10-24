'use strict'
import Tag from '../models/tag'
import Article from '../models/article'
import {resErr, resSuccess} from '../utils/resHandle'
import mongoose from "mongoose";

export const insertTag = async (tag) => {
	try {
		let findOne = await Tag.find({tagName: tag.tagName})
		let res
		if (findOne.length > 0) {
			res = await Tag.updateOne({_id: findOne[0]._doc._id},tag)
		} else {
			res = await (new Tag(tag)).save()
		}
		return res
	}catch (e) {
		return e
	}
}

export const getTagListByPage = async (page = null) => {
	let pipelineArr = [
		{ $skip : 0 }
	]
	if (page) {
		pipelineArr.push(
			{ $skip : 10 * (page - 1) },
			{ $limit : 10 }
		)
	}
	let res_limit = await Tag.aggregate(pipelineArr)
	let total = await Tag.countDocuments()
	return {total: total, res_limit: res_limit}
}

export const deleteTag = async (tagId) => {
	await Article.updateMany({'tags':mongoose.Types.ObjectId(tagId)},{'$pull':{'tags':mongoose.Types.ObjectId(tagId)}})

	return Tag.findByIdAndRemove(tagId)
}

