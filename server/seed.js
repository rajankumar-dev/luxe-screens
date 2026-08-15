import dotenv from "dotenv";
import mongoose from "mongoose";

import Theater from "./models/Theater.js";
import Slot from "./models/Slot.js";
import AddOn from "./models/AddOn.js";

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/luxe-screens");
    // await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    await Theater.deleteMany({});
    await Slot.deleteMany({});
    await AddOn.deleteMany({});

    const theaters = await Theater.insertMany([
      {
        name: "Luxe Gold",
        basePrice: 2500,
        maxCapacity: 6,
        screen: "4K",
        sound: "Dolby Atmos",
      },
      {
        name: "Luxe Premium",
        basePrice: 3500,
        maxCapacity: 8,
        screen: "4K",
        sound: "Dolby Atmos",
      },
    ]);

    await Slot.insertMany([
      {
        time: "10:00 AM",
        status: "available",
        theaterId: theaters[0]._id,
      },
      {
        time: "01:00 PM",
        status: "available",
        theaterId: theaters[0]._id,
      },
      {
        time: "04:00 PM",
        status: "available",
        theaterId: theaters[1]._id,
      },
      {
        time: "07:00 PM",
        status: "available",
        theaterId: theaters[1]._id,
      },
    ]);

    await AddOn.insertMany([
      {
        name: "Birthday Cake",
        category: "CAKE",
        options: ["Chocolate", "Vanilla", "Red Velvet"],
      },
      {
        name: "Room Decoration",
        category: "DECOR",
        options: ["Basic", "Premium"],
      },
      {
        name: "Gift",
        category: "GIFT",
        options: ["Teddy Bear", "Flowers", "Chocolates"],
      },
    ]);

    console.log("Seed data inserted successfully");

    await mongoose.connection.close();
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }
};

seedData();
