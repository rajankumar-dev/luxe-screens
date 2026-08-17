import express from "express";
import {
  getTheaterById,
  getTheaters,
} from "../controllers/theaterController.js";
const router = express.Router();

router.get("/", getTheaters);
router.get("/:id", getTheaterById);

export default router;
