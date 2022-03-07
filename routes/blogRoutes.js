import { Router } from "express";

import {
  blog_index,
  blog_create_post,
  blog_details,
  blog_delete,
  blogUpdate,
} from "../controllers/BlogController.js";
import { auth as verify } from "./verifyToken.js";

const router = Router();

router.get("/", blog_index);

router.post("/", verify, blog_create_post);

router.get("/:id", blog_details);

//!! Update
router.put("/:id", verify, blogUpdate);

//!! Handling DELETE request
router.delete("/:id", verify, blog_delete);

export { router };
