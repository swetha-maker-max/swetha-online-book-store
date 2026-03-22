require('dotenv').config();
// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(
  "mongodb+srv://swethaUser:MyPass123@cluster0.mongodb.net/bookstore?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("Error connecting MongoDB:", err));


// ✅ Cart Schema & Model
const CartSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: { type: Number, default: 1 }
});
const Cart = mongoose.model("Cart", CartSchema);

// ✅ Add item to cart
app.post("/cart", async (req, res) => {
  try {
    console.log("Request body:", req.body);

    const { name, price, quantity } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Missing name or price" });
    }

    let item = await Cart.findOne({ name });

    if (item) {
      item.quantity += quantity ? quantity : 1;
      await item.save();
      return res.json({ message: "Cart updated", item });
    }

    const newItem = new Cart({
      name,
      price,
      quantity: quantity ? quantity : 1,
    });

    await newItem.save();

    res.json({ message: "Item added to cart", item: newItem });

  } catch (err) {
    console.error("Cart Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get all cart items
app.get("/cart", async (req, res) => {
  try {
    const items = await Cart.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Error fetching cart" });
  }
});

// ✅ Delete item by ID
app.delete("/cart/:id", async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting item" });
  }
});

// ✅ Test route
app.get("/", (req, res) => res.send("Backend is running"));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));