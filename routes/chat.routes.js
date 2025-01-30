import express from "express";
import { sendMessage, getMessages } from "../controller/chat.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/send", verifyToken, sendMessage);
router.post("/message", verifyToken, getMessages);

export default router;