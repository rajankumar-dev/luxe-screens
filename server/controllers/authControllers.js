import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { sendEmail } from "../utils/sendEmail.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Check required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // 5. OTP expires after 10 minutes
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // 6. Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpiresAt,
      isVerified: false,
    });

    // 7. Send OTP email
    await sendEmail(
      email,
      "Luxe Screens - Email Verification OTP",
      `
        <h2>Welcome to Luxe Screens</h2>

        <p>Hello ${name},</p>

        <p>Your email verification OTP is:</p>

        <h1>${otp}</h1>

        <p>This OTP will expire in 10 minutes.</p>

        <p>If you did not create this account, please ignore this email.</p>

        <p>Thank you,<br />Luxe Screens Team</p>
      `,
    );

    // 8. Response
    res.status(201).json({
      success: true,
      message: "Registration successful. OTP sent to your email.",
      userId: user._id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message,
    });
  }
};
