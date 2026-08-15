import express from "express";
import { createCartItem } from "../controllers/cartItemControllers.js";

const router = express.Router();

router.post("/", createCartItem);

export default router;
