/** @format */

import express from "express";
import {
	getAllSubscribers,
	subscribeToNewsletter,
	unsubscribeToNewsletter,
} from "../controllers/subscriberController.js";


const router = express.Router();

router.post("/", subscribeToNewsletter);
router.get("/", getAllSubscribers);
router.delete("/", unsubscribeToNewsletter);

export default router;
