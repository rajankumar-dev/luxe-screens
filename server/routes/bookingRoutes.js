import express from "express";
import {
  createBooking,
  getBookingById,
  getMyBookings,
} from "../controllers/bookingController.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createBooking);

router.get("/", authMiddleware, getMyBookings);

router.get("/:id", authMiddleware, getBookingById);
export default router;
