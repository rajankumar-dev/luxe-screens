import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

dotenv.config();
const app = express();

//Import Routes
import theaterRoutes from "./routes/theaterRoutes.js";
import slotRoutes from "./routes/slotRoutes.js";
import addOns from "./routes/addOnRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import cartItemRoutes from "./routes/cartItemRoutes.js";

//auth routes
import authRoutes from "./routes/authRoute.js";

//middlewares
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

//MongoDB connection
connectDB();

//test route
app.get("/", (req, res) => {
  res.json({
    message: "Luxe Screen API is running",
  });
});

//Routes
app.use("/api/theaters", theaterRoutes);
app.use("/api/slots", slotRoutes);
app.use("/api/addOns", addOns);
app.use("/api/bookings", bookingRoutes);
app.use("/api/cart-items", cartItemRoutes);
app.use("/api/auth", authRoutes);

// console.log("PORT:", process.env.PORT);
// console.log("EMAIL_USER:", process.env.EMAIL_USER);
// console.log(
//   "EMAIL_PASSWORD:",
//   process.env.EMAIL_PASSWORD ? "Present" : "Missing",
// );

app.listen(port, () => {
  console.log(`server runnig on http://localhost:${port}`);
});
