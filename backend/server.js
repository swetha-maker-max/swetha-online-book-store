require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log("MongoDB connection error:", err));

// Cart Schema
const CartSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number
});

const Cart = mongoose.model("Cart", CartSchema);

// Add to cart
app.post("/cart", async (req, res) => {
  try {
    const item = new Cart(req.body);
    await item.save();
    res.json({ message: "Item added to cart" });
  } catch (err) {
    res.status(500).json({ error: "Error adding to cart" });
  }
});

// Get cart
app.get("/cart", async (req, res) => {
  try {
    const items = await Cart.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Error fetching cart" });
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// IMPORTANT: Render uses process.env.PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));