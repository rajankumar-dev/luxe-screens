import express from "express";
import { getAddOn } from "../controllers/addOnControllers.js";

const router = express.Router();
router.get("/", getAddOn);

export default router;
