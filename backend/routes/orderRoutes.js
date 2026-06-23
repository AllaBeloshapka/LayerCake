const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ sentAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
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

module.exports = router;
