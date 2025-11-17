
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors()); // разрешаем запросы с любого источника
app.use(bodyParser.json());

const PORT = 5000;

// Подключение к MongoDB
mongoose
  .connect(
    "mongodb+srv://allabeloshapka4_db_user:aSwq8943@cluster0.imwvz7d.mongodb.net/cake-server?retryWrites=true&w=majority"
  )
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch((err) => console.error("❌ Ошибка подключения к MongoDB:", err));

//  Модель заказа
const orderSchema = new mongoose.Schema({
  productId: Number,
  cakeName: String,
  customerName: String,
  phone: String,
  email: String,
  birthDate: String,
  orderDateTime: String,
  status: { type: String, default: "New order" },
  sentAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema); // коллекция "orders"

//  Маршрут для создания заказа
app.post("/api/orders", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res
      .status(201)
      .json({ message: "Order saved successfully", order: newOrder });
  } catch (err) {
    console.error("Ошибка при создании заказа:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Маршрут для получения всех заказов
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    console.error("Ошибка при получении заказов:", err);
    res.status(500).json({ error: "Ошибка при получении заказов" });
  }
});

//Новый маршрут для обновления статуса заказа
app.put("/api/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Заказ не найден" });
    }

    console.log(`Статус заказа ${id} обновлён на "${status}"`);
    res.json(updatedOrder);
  } catch (err) {
    console.error("Ошибка при обновлении статуса заказа:", err);
    res.status(500).json({ error: "Ошибка при обновлении статуса заказа" });
  }
});

//  Запуск сервера
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

