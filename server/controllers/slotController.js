import Slot from "../models/Slot.js";

export const getSlots = async (req, res) => {
  try {
    const { theaterId } = req.query;

    const filter = theaterId ? { theaterId } : {};

    const slots = await Slot.find(filter);

    res.status(200).json({
      success: true,
      slots,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch slots",
      error: error.message,
    });
  }
};
