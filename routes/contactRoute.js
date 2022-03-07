import { Router } from "express";

import { auth as verify } from "./verifyToken.js";

import {
  allMessage,
  createMessage,
  messageDetails,
  deleteMessage,
} from "../controllers/contactController.js";

const router = Router();

//!!get All messages
router.get("/", allMessage);

//!!Posting new message
router.post("/contactUs", createMessage);

//!!get one message
router.get("/:id", messageDetails);

//!!Delete a Message
router.delete("/:id", verify, deleteMessage);

export { router };
