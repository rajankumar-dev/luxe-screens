import Slot from "../models/Slot.js";

export const getSlots = async (req, res) => {
  try {
    const slots = await Slot.find();

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

export const getSlotById = async (req, res) => {
  try {
    const slot = await Slot.findById(req.params.id);

    if (!slot) {
      return res.status(404).json({
        success: false,
        message: "Slot not found",
      });
    }

    res.status(200).json({
      success: true,
      slot,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch slot",
      error: error.message,
    });
  }
};
