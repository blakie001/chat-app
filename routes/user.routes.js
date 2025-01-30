import express from "express";
const router = express.Router();
import { getUserProfile, getUserWhoSentMessage } from "../controller/user.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";


router.get("/profile", verifyToken, getUserProfile);

router.get("/users", verifyToken, getUserWhoSentMessage);

export default router;