import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, html) => {
  try {
    // Check environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      throw new Error(
        "EMAIL_USER or EMAIL_PASSWORD is missing in environment variables",
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },

      // Prevent request from hanging for a long time
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
    });

    await transporter.sendMail({
      from: `"Luxe Screens" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log(`Email sent successfully to ${to}`);
  } catch (error) {
    console.error("Email sending failed:", error);

    throw error;
  }
};
