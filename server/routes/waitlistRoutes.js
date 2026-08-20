import express from "express";

import { joinWaitlist } from "../controllers/waitlistControllers.js";

const router = express.Router();

router.post("/", joinWaitlist);

export default router;
