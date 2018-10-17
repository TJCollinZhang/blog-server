'use strict'
import Tag from '../models/tag'
import {resErr, resSuccess} from '../utils/resHandle'

export const insertTag = async (tag) => {
    let res = await (new Tag(tag)).save()
    return res
}

export const getTagList = async () => {
    let res = await Tag.find()
    return res
}

