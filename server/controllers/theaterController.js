import Theater from "./../models/Theater.js";

export const getTheaters = async (req, res) => {
  try {
    const theaters = await Theater.find();
    res.status(200).json({
      success: true,
      theaters,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch theater",
      error: error.message,
    });
  }
};
