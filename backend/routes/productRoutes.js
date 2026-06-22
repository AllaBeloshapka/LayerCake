const express = require("express");
const Product = require("../models/Product");
const upload = require("../middleware/upload");
const { convertToWebP } = require("../services/imageService");
const { uploadProductImage } = require("../services/s3Service");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ productCode: 1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const productData = {
      productCode: Number(req.body.productCode),
      name: req.body.name,
      price: Number(req.body.price),
      description: req.body.description || "",
      flavor: req.body.flavor || "",
      ingredients: req.body.ingredients || "",
      weight: Number(req.body.weight) || 0,
      height: Number(req.body.height) || 0,
      diameter: Number(req.body.diameter) || 0,
    };

    if (req.file) {
      const webpBuffer = await convertToWebP(req.file.buffer);
      const key = `products/${productData.productCode}-${Date.now()}.webp`;
      productData.image = await uploadProductImage(webpBuffer, key);
    } else if (req.body.image) {
      productData.image = req.body.image;
    }

    if (!productData.image) {
      return res.status(400).json({
        message: "Product image is required",
      });
    }

    const product = await Product.create(productData);
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

router.delete("/:id", async (req, res) => {
  try {
    const productCode = Number(req.params.id);
    const product = await Product.findOneAndDelete({ productCode });

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product" });
  }
});

module.exports = router;
