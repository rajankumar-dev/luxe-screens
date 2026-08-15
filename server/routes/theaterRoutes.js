import express from "express";
import { getTheaters } from "../controllers/theaterController.js";
const router = express.Router();

router.get("/", getTheaters);

export default router;
