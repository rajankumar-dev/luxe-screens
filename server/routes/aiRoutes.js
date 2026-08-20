import express from "express";

import { generateRecommendation } from "../controllers/aiController.js";

const router = express.Router();

router.post("/planner", generateRecommendation);

export default router;
