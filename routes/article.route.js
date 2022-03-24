/** @format */

import express from "express";
import {
	deleteArticleById,
	getAllArticles,
	getById,
	saveArticle,
	updateArticle,
} from "../controllers/article.controller.js";
import { auth as verify } from "./verifyToken.js";

import multer from 'multer'
const router = express.Router()
const storage = multer.diskStorage({});
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb('invalid image file!', false);
    }
};
const uploads = multer({ storage, fileFilter });
router.post('/', uploads.single('image'), (req, res, next) => {
    new saveArticle()
        .createArticle(req, res, next)
})
router.get("/", getAllArticles);
router.get("/:id", getById);
router.put("/:id", updateArticle);
router.delete("/:id", deleteArticleById);

export default router;
