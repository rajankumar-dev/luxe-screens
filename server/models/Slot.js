import mongoose from "mongoose";

const slotSchema = new mongoose.Schema(
  {
    time: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      required: true,
    },

    theaterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Theater",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Slot = mongoose.model("Slot", slotSchema);

export default Slot;
