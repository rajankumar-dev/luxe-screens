import express from "express";
const app = express();
const PORT = 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Luxe Screen API is running",
  });
});

app.listen(PORT, () => {
  console.log(`server runnig on http://localhost:${PORT}`);
});
