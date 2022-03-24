//import Article from "../model/article.model"
import  Article  from "../model/article.model.js";
export class ArticleServices {
    static async createArticle(data) {
        const article = await Article(data)
        article.save()
        return article
    }}
