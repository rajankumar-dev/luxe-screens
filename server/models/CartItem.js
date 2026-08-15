import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },

    addOnId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AddOn",
      required: true,
    },

    optionName: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const CartItem = mongoose.model("CartItem", cartItemSchema);

export default CartItem;
