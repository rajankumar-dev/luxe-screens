import mongoose from "mongoose";

const theaterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    basePrice: {
      type: Number,
      required: true,
      min: 0,
    },
    maxCapacity: {
      type: Number,
      required: true,
      min: 1,
    },
    screen: {
      type: String,
      required: true,
    },
    sound: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Theater = mongoose.model("Theater", theaterSchema);
export default Theater;
