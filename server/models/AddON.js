import mongoose from "mongoose";

const addOnSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: ["CAKE", "DECOR", "GIFT"],
      required: true,
    },

    options: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const AddOn = mongoose.model("AddOn", addOnSchema);

export default AddOn;
