
export const saveArticle =  
	
const newArticle = new Article(article);
await newArticle.save();
res.status(201).json({ success: true, data: newArticle });
};

(req, res, next) => {
	const { error } = articleValidation(req.body);
	console.log(req.file);
	if (error) return res.status(400).json({ message: error.details[0].message });
	if (req.file) {
		req.body.image = await fileUpload(req);
	} else {
		req.body.image =
			"https://images.app.goo.gl/KSrkEVNSfxm96ckT9";
	}
	const article = {
		cover: req.body.image,
		title: req.body.title,
		slug: req.body.content,
		author: req.body.author,
		content: req.body.author,
		status: false,




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