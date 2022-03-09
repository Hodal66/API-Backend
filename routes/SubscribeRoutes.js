
import {router} from "express";

import {
    sub_add,
    sub_see_one,
    allSubscribes,
    sub_remove,
} from "../controllers/subscribe.controler";
import { admin as verifyAdmin } from "./verifyToken.js";

//!!get All subscribers
router.get("/", allSubscribes);

//!!Posting new subscuber
router.post("/subscribe", sub_add);

//!!get one subscuber
router.get("/:id", sub_see_one);

//!!Delete a subsriber
router.delete("/:id", verify, sub_remove);

export { router };
