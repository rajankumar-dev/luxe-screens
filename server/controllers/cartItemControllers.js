import CartItem from "../models/CartItem.js";

export const createCartItem = async (req, res) => {
  try {
    const { bookingId, addOnId, optionName, price, quantity } = req.body;

    const cartItem = await CartItem.create({
      bookingId,
      addOnId,
      optionName,
      price,
      quantity,
    });

    res.status(201).json({
      success: true,
      cartItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create Cart-Item",
      error: error.message,
    });
  }
};
