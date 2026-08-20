import express from "express";
import {
  confirmBooking,
  createBooking,
  getBookingById,
  getMyBookings,
} from "../controllers/bookingController.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createBooking);

router.get("/", authMiddleware, getMyBookings);

router.get("/:id", authMiddleware, getBookingById);
router.post("/:id/confirm", authMiddleware, confirmBooking);

export default router;
