import AddOn from "./../models/AddOn.js";

export const getAddOn = async (req, res) => {
  try {
    const addons = await AddOn.find();

    res.status(200).json({
      success: true,
      addons,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch addOns",
      error: error.message,
    });
  }
};
