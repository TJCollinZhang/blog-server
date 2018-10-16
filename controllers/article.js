'use strict'
import Article from '../models/article'

export const insertArticle = async (article) => {
    let res = null
    res = await (new Article(article)).save()
    return res
}

