
import { Router } from "express";

import { auth as verify } from "./verifyToken.js";

import {
    subscribeToNewsletter,
    getAllSubscribers,
    unsubscribeToNewsletter,
} from "../controllers/subscriberController.js";

const router = Router();

//!!AALL SUBSCRIBERS
router.get("/", getAllSubscribers);

//!!SUBSCRIBE
router.post("/subscribe", subscribeToNewsletter);

//!!UNSUBSCRIBE
router.delete("/:email", verify, unsubscribeToNewsletter);

 export { router };
