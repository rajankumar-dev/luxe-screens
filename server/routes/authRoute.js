import express from "express";
import {
  login,
  register,
  resendOTP,
  verifyOTP,
  getMe,
} from "../controllers/authControllers.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/verify-otp", verifyOTP);
router.post("/resend-otp", resendOTP);
router.post("/login", login);
router.get("/me", authMiddleware, getMe);

export default router;
