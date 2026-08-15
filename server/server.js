import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

//Import Routes
import theaterRoutes from "./routes/theaterRoutes.js";
import slotRoutes from "./routes/slotRoutes.js";

dotenv.config();
const app = express();

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

app.listen(port, () => {
  console.log(`server runnig on http://localhost:${port}`);
});
