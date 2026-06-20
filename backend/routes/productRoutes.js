const express = require("express");
const testProducts = require("../data/testProducts");

const router = express.Router();

router.get("/", (req, res) => {
  res.json(testProducts);
});

router.get("/:id", (req, res) => {
  const productCode = Number(req.params.id);
  const product = testProducts.find((item) => item.productCode === productCode);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

module.exports = router;
