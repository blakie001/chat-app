import express from "express";
const router = express.Router();
import userController from "../controller/user.controller.js";

import { verifyToken } from "../middlewares/auth.middleware.js";


router.get("/profile", verifyToken, userController.getUserProfile);

export default router;