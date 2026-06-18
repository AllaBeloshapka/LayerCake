const express = require("express");
const testProducts = require("../data/testProducts");

const router = express.Router();

router.get("/", (req, res) => {
  res.json(testProducts);
});

module.exports = router;
