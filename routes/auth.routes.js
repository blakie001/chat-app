import express from "express";
const router = express.Router();
import { loginUser, signupUser } from "../controller/auth.controller.js";

router.post("/login", loginUser);
router.post("/signup", signupUser);

export default router;

// import express from "express";
// import { newVote , getLeaderboardData} from "../controllers/vote.controller.js";

// const router = express.Router();

// router.post("/polls/:id/vote", newVote);

// router.get("/leaderboard", getLeaderboardData);

// export default router;