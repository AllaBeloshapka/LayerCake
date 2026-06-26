const express = require("express");
const Review = require("../models/Review");
const Product = require("../models/Product");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find({ status: "approved" }).sort({
      submittedAt: -1,
    });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
});

router.get("/pending", async (req, res) => {
  try {
    const reviews = await Review.find({ status: "pending" }).sort({
      submittedAt: 1,
    });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch pending reviews" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { orderId, productCode, cakeName, customerName, rating, text, image } =
      req.body;

    if (!text) {
      res.status(400).json({ message: "Text is required" });
      return;
    }

    if (!orderId) {
      res.status(400).json({ message: "Order ID is required" });
      return;
    }

    if (!productCode) {
      res.status(400).json({ message: "Product code is required" });
      return;
    }

    if (!cakeName) {
      res.status(400).json({ message: "Cake name is required" });
      return;
    }

    if (!customerName) {
      res.status(400).json({ message: "Customer name is required" });
      return;
    }

    const product = await Product.findOne({ productCode: Number(productCode) });

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    const reviewData = {
      orderId,
      productCode: Number(productCode),
      cakeName,
      customerName,
      text,
      image: image || "",
      productImage: product.image || "",
    };

    if (rating !== undefined) {
      reviewData.rating = Number(rating);
    }

    const review = await Review.create(reviewData);
    res.status(201).json(review);
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(400).json({ message: "Invalid review data" });
      return;
    }

    res.status(500).json({ message: "Failed to create review" });
  }
});

router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      res.status(400).json({ message: "Status is required" });
      return;
    }

    if (status !== "approved" && status !== "rejected") {
      res.status(400).json({ message: "Invalid review status" });
      return;
    }

    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true },
    );

    if (!review) {
      res.status(404).json({ message: "Review not found" });
      return;
    }

    res.json(review);
  } catch (error) {
    res.status(500).json({ message: "Failed to update review status" });
  }
});

module.exports = router;
