const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ productCode: 1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json({ message: "Product code already exists" });
      return;
    }

    if (error.name === "ValidationError") {
      res.status(400).json({ message: "Invalid product data" });
      return;
    }

    res.status(500).json({ message: "Failed to create product" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const productCode = Number(req.params.id);
    const product = await Product.findOne({ productCode });

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch product" });
  }
});

module.exports = router;
