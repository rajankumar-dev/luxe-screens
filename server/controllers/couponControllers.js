import Coupon from "../models/Coupon.js";

export const validateCoupon = async (req, res) => {
  try {
    const { code, amount } = req.body;

    if (!code || amount === undefined) {
      return res.status(400).json({
        success: false,
        message: "Coupon code and amount are required.",
      });
    }

    const coupon = await Coupon.findOne({
      code: code.trim().toUpperCase(),
    });

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Invalid coupon code.",
      });
    }

    if (!coupon.isActive) {
      return res.status(400).json({
        success: false,
        message: "This coupon is no longer active.",
      });
    }

    if (new Date() > coupon.expiresAt) {
      return res.status(400).json({
        success: false,
        message: "This coupon has expired.",
      });
    }

    if (amount < coupon.minAmount) {
      return res.status(400).json({
        success: false,
        message: `Minimum booking amount for this coupon is ₹${coupon.minAmount}.`,
      });
    }

    let discount = 0;

    if (coupon.discountType === "PERCENTAGE") {
      discount = (amount * coupon.discountValue) / 100;
    } else if (coupon.discountType === "FLAT") {
      discount = coupon.discountValue;
    }

    // Discount cannot be greater than booking amount
    discount = Math.min(discount, amount);

    const finalAmount = amount - discount;

    return res.status(200).json({
      success: true,
      message: "Coupon applied successfully.",
      coupon: {
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
      },
      discount,
      finalAmount,
    });
  } catch (error) {
    console.error("Coupon validation error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to validate coupon.",
      error: error.message,
    });
  }
};
