const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    message: "LayerCake backend is running",
    status: "OK",
  });
});

app.listen(PORT, () => {
  console.log(`LayerCake backend is running on http://localhost:${PORT}`);
});