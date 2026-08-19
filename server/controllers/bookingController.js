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
      paymentMethod,
      paymentStatus,
      theaterId,
      slotId,
      cake,
      decor,
      gift,
    } = req.body;

    const booking = await Booking.create({
      userId: req.user.userId,
      location,
      date,
      guests,
      name,
      phone,
      email,
      occasion,
      total,
      paymentMethod,
      paymentStatus,
      theaterId,
      slotId,
      cake,
      decor,
      gift,
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
