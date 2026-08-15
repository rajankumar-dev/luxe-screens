import Booking from "./../models/Booking.js";

export const createBooking = async (req, res) => {
  try {
    const {
      location,
      date,
      guests,
      name,
      phone,
      email,
      occasion,
      total,
      paymentStatus,
      theaterId,
      slotId,
    } = req.body;

    const booking = await Booking.create({
      location,
      date,
      guests,
      name,
      phone,
      email,
      occasion,
      total,
      paymentStatus,
      theaterId,
      slotId,
    });

    res.status(201).json({
      success: true,
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create booking",
      error: error.message,
    });
  }
};
