const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    productCode: {
      type: Number,
      required: true,
    },
    cakeName: {
      type: String,
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    birthDate: {
      type: Date,
    },
    orderDateTime: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "New order",
    },
    sentAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
