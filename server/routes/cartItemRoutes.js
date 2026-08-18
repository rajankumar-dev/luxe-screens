import express from "express";
import { createCartItem } from "../controllers/cartItemControllers.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createCartItem);

export default router;
