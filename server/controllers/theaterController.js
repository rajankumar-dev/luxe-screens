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

export const getTheaterById = async (req, res) => {
  try {
    const theater = await Theater.findById(req.params.id);

    if (!theater) {
      return res.status(404).json({
        success: false,
        message: "Theater not found",
      });
    }

    res.status(200).json({
      success: true,
      theater,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch theater",
      error: error.message,
    });
  }
};
