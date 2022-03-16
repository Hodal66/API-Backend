import { Router } from "express";

import { auth as verify } from "./verifyToken.js";

import {
  allMessage,
  createMessage,
  messageDetails,
  deleteMessage,
} from "../controllers/contactController.js";

const router = Router();
/**
 * @openapi
 * tags:
 *  name: Contact
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Contact:
 *      type: object
 *      required:
 *        - name
 *        - email
 *        - message
 *      properties:
 *        name:
 *          type: string
 *          description: Every message should have a name for sender
 *        email:
 *          type: string
 *          description: Every message should have an email for sender
 *        message:
 *          type: string
 *          description: content should be included to be sent
 *      example:
 *        name: your name
 *        email: me@gmail.com
 *        message: your message
 */

/**
 * @swagger
 * /api/v1/contacts:
 *  get:
 *    summary: This route returns a list of messages
 *    responses:
 *      200:
 *        description: Success
 *      204:
 *        description: No content found
 *      500:
 *        description: Internal server error
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Contact'
 */

//!!get All messages
router.get("/", allMessage);
/**
 * @swagger
 * /api/v1/contacts/contactUs:
 *  post:
 *    summary: a user can send a question or comment
 *    description: both name, email and message must be filled
 *    tags:
 *      - Contact
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Contact'
 *    responses:
 *      200:
 *        description: Successfully Sent
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Contact'
 *      400:
 *        description: Invalid user input!
 *      500:
 *        description: Internal server error!
 */

//!!Posting new message
router.post("/contactUs", createMessage);

//!!get one message
router.get("/:id", messageDetails);

//!!Delete a Message
router.delete("/:id", verify, deleteMessage);

export { router };
