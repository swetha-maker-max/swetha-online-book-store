const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/bookstore")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Error connecting MongoDB:", err));

// Schema
const CartSchema = new mongoose.Schema({
  name: String,
  price: Number
});

// Model
const Cart = mongoose.model("Cart", CartSchema);

// API to save data
app.post("/cart", async (req, res) => {
  try {
    const data = new Cart(req.body);
    await data.save();
    res.send("cart was added to MongoBD");
  } catch (error) {
    res.send("Error saving data");
  }
});
app.get("/cart", async (req, res) => {
  const data = await Cart.find();
  res.json(data);
});
app.get("/cart", async (req, res) => {
  const data = await Cart.find();
  res.json(data);
});

// 👇 PASTE HERE
app.delete("/cart/:id", async (req, res) => {
  await Cart.findByIdAndDelete(req.params.id);
  res.send("Item deleted");
});

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});