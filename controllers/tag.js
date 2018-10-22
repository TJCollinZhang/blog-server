'use strict'
import Tag from '../models/tag'
import {resErr, resSuccess} from '../utils/resHandle'

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

export const getTagListByPage = async (page) => {
	// let res = await Tag.find().sort({"ID":1}).skip(10).limit(10)
	let res = await Tag.find()
	let total = res.length
	let res_limit = await Tag.find().sort({"_id": 1}).skip(10 * (page - 1)).limit(10)
	return {total: total, res_limit: res_limit}
}

export const deleteTag = async (tagId) => {
	return Tag.findByIdAndRemove(tagId)
}

