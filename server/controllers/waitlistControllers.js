import Waitlist from "../models/Waitlist.js";

export const joinWaitlist = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name, email and phone are required.",
      });
    }

    const existingEntry = await Waitlist.findOne({ email });

    if (existingEntry) {
      return res.status(409).json({
        success: false,
        message: "You are already on the waitlist.",
      });
    }

    const waitlistEntry = await Waitlist.create({
      name,
      email,
      phone,
    });

    res.status(201).json({
      success: true,
      message: "You have successfully joined the waitlist.",
      waitlist: waitlistEntry,
    });
  } catch (error) {
    console.error("Waitlist Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to join waitlist.",
      error: error.message,
    });
  }
};
