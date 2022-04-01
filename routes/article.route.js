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
import { admin } from "./verifyToken.js";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({});
const fileFilter = (req, file, cb) => {
	if (file.mimetype.startsWith("image")) {
		cb(null, true);
	} else {
		cb("invalid image file!", false);
	}
};
const uploads = multer({ storage, fileFilter });

router.post("/", uploads.single("image"), saveArticle);
router.get("/", getAllArticles);
router.get("/:id", getById);
router.put("/:id", admin, updateArticle);
router.delete("/:id", admin, deleteArticleById);

export default router;
