/** @format */

import Article from "../model/article.model.js";
import { fileUpload } from "../helpers/multer.js";
import { articleValidation } from "../validation.js";
import cloudinary from "cloudinary";
import {ArticleServices} from "../services/article.services.js"

export class saveArticle {
    // TODO Don't access database from this file you only needs
    async createArticle(req, res, next) {
        try {
            console.log(req.file);
            cloudinary.v2.uploader.upload(req.file.path, async function(err, image) {
                if (err) { console.warn(err); }
                req.body.image = image.url
                const data = {
                    title: req.body.title,
                    content: req.body.content,
					author:req.body.author,
                    image: req.body.image,
                    create_at: new Date()
                }
                console.log(data)
               const article = await ArticleServices.createArticle(data)
                res.status(200).json({ status: 200, message: "Article created successfully.....", data: article })
            });
        } catch (error) {
            console.log(error)
        }
    } }






export const getAllArticles = async (req, res) => {
	const articles = await Article.find();
	res.status(200).json({ success: true, data: articles });
};

export const getById = async (req, res) => {
	const { id } = req.params;
	const article = await Article.findById(id);
	if (!article)
		return res
			.status(404)
			.json({ success: false, message: "Article not found" });
	res.status(200).json({ success: true, data: article });
};

export const updateArticle = async (req, res) => {
	const { id } = req.params;

	const { error } = articleValidation(req.body);
	if (error) return res.status(400).json({ message: error.details[0].message });

	const updates = req.body;
	const article = await Article.findById(id);
	if (!article)
		return res
			.status(404)
			.json({ success: false, message: "Article not found" });
	await Article.findByIdAndUpdate(id, updates);
	res
		.status(200)
		.json({ success: true, message: "Article updated successfully" });
};

export const deleteArticleById = async (req, res) => {
	const id = req.params.id;
	const article = await Article.findById(id);
	if (!article)
		return res.status(404).json({ success: 404, message: "Article not found" });
	//await Article.findByIdAndDelete(id);
	const articleDelete = await Article.findByIdAndDelete(id);
	res.status(200).json({ success: 200, message: "Article deleted" });

	//return res.status(500).json({status: 500, message: "Internal server error!" });

};
  