const express = require("express");
const Order = require("../models/Order");
const requireAdminAuth = require("../middleware/requireAdminAuth");
const { sendReviewRequestEmail } = require("../services/emailService.js");

const router = express.Router();

router.get("/", requireAdminAuth, async (req, res) => {
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

    if (sendReviewEmail !== true) {
      await order.save();
      res.json({
        order,
        reviewEmail: {
          requested: false,
          sent: false,
          failed: false,
          skipped: true,
          message: "Review email was not requested.",
        },
      });
      return;
    }

    const shouldSendReviewEmail =
      status === "Completed" &&
      order.email &&
      order.reviewEmailSent !== true &&
      order.reviewEmailSending !== true;

    if (!shouldSendReviewEmail) {
      await order.save();

      let skipMessage = "Review email was skipped.";

      if (status !== "Completed") {
        skipMessage =
          "Review email was skipped because the order status is not Completed.";
      } else if (!order.email) {
        skipMessage =
          "Review email was skipped because the order has no email address.";
      } else if (order.reviewEmailSent === true) {
        skipMessage =
          "Review email was skipped because a review email was already sent.";
      } else if (order.reviewEmailSending === true) {
        skipMessage =
          "Review email was skipped because a review email is already being sent.";
      }

      res.json({
        order,
        reviewEmail: {
          requested: true,
          sent: false,
          failed: false,
          skipped: true,
          message: skipMessage,
        },
      });
      return;
    }

    const lockedOrder = await Order.findOneAndUpdate(
      {
        _id: order._id,
        reviewEmailSent: { $ne: true },
        reviewEmailSending: { $ne: true },
      },
      {
        status,
        reviewEmailSending: true,
        reviewEmailFailedAt: null,
      },
      { new: true, runValidators: true },
    );

    if (!lockedOrder) {
      const latestOrder = await Order.findById(order._id);
      res.json({
        order: latestOrder,
        reviewEmail: {
          requested: true,
          sent: false,
          failed: false,
          skipped: true,
          message:
            "Review email was already being sent or was already sent.",
        },
      });
      return;
    }

    const frontendBaseUrl =
      process.env.FRONTEND_BASE_URL || "http://localhost:5500";
    const reviewLink = `${frontendBaseUrl}/review_form/index.html?orderId=${lockedOrder._id}`;

    try {
      await sendReviewRequestEmail(lockedOrder, reviewLink);
      lockedOrder.reviewEmailSent = true;
      lockedOrder.reviewEmailSending = false;
      lockedOrder.reviewEmailSentAt = new Date();
      lockedOrder.reviewEmailFailedAt = null;
      await lockedOrder.save();

      res.json({
        order: lockedOrder,
        reviewEmail: {
          requested: true,
          sent: true,
          failed: false,
          skipped: false,
          message: "Review email was sent successfully.",
        },
      });
    } catch (error) {
      console.error("Failed to send review request email:", error);
      lockedOrder.reviewEmailSent = false;
      lockedOrder.reviewEmailSending = false;
      lockedOrder.reviewEmailFailedAt = new Date();
      await lockedOrder.save();

      res.json({
        order: lockedOrder,
        reviewEmail: {
          requested: true,
          sent: false,
          failed: true,
          skipped: false,
          message:
            "Order was completed, but the review email was not sent. Please check email settings and try again.",
        },
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update order status" });
  }
});

module.exports = router;
