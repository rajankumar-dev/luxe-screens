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

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      userId: req.user.userId,
    })
      .populate("theaterId")
      .populate("slotId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
      error: error.message,
    });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    })
      .populate("theaterId")
      .populate("slotId");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch booking",
      error: error.message,
    });
  }
};

export const confirmBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.paymentStatus === "PAID") {
      return res.status(400).json({
        success: false,
        message: "Booking is already confirmed.",
      });
    }

    booking.paymentStatus = "PAID";

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking confirmed successfully.",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to confirm booking",
      error: error.message,
    });
  }
};
