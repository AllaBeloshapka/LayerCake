const express = require("express");
const Order = require("../models/Order");
const { sendReviewRequestEmail } = require("../services/emailService.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ sentAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch order" });
  }
});

router.post("/", async (req, res) => {
  try {
    const orderData = {
      productCode: Number(req.body.productCode),
      cakeName: req.body.cakeName,
      customerName: req.body.customerName,
      price: Number(req.body.price),
      phone: req.body.phone,
      email: req.body.email,
      birthDate: req.body.birthDate || null,
      orderDateTime: req.body.orderDateTime,
      status: "New order",
      sentAt: new Date(),
    };

    const order = await Order.create(orderData);
    res.status(201).json(order);
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(400).json({ message: "Invalid order data" });
      return;
    }

    res.status(500).json({ message: "Failed to create order" });
  }
});

router.patch("/:id/status", async (req, res) => {
  try {
    const { status, sendReviewEmail } = req.body;

    if (!status) {
      res.status(400).json({ message: "Status is required" });
      return;
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    order.status = status;

    if (
      status === "Completed" &&
      sendReviewEmail === true &&
      order.email &&
      order.reviewEmailSent !== true
    ) {
      const frontendBaseUrl =
        process.env.FRONTEND_BASE_URL || "http://localhost:5500";
      const reviewLink = `${frontendBaseUrl}/review_form/index.html?orderId=${order._id}`;

      try {
        await sendReviewRequestEmail(order, reviewLink);
        order.reviewEmailSent = true;
      } catch (error) {
        console.error("Failed to send review request email:", error);
      }
    }

    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Failed to update order status" });
  }
});

module.exports = router;
