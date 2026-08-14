import express from "express";
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Luxe Screen API is running",
  });
});

app.listen(port, () => {
  console.log(`server runnig on http://localhost:${port}`);
});
