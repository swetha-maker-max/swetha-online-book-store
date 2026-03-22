import { useState, useEffect } from "react";

const API_URL = "https://swetha-online-book-store.onrender.com";

function App() {
  const [books] = useState([
    { name: "Harry Potter", price: 500 },
    { name: "Wings of Fire", price: 300 },
    { name: "The Alchemist", price: 400 }
  ]);

  const [cart, setCart] = useState([]);

  const getCart = () => {
    fetch(`${API_URL}/cart`)
      .then(res => res.json())
      .then(data => setCart(data));
  };

  useEffect(() => {
    getCart();
  }, []);

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

  const deleteItem = (id) => {
    fetch(`${API_URL}/cart/${id}`, {
      method: "DELETE"
    })
      .then(() => getCart());
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>📚 Swetha's Online Book Store</h1>

      <h2>Books</h2>
      {books.map((book, index) => (
        <div key={index}>
          {book.name} - ₹{book.price}
          <button onClick={() => addToCart(book)}>Add</button>
        </div>
      ))}

      <h2>🛒 Cart</h2>
      {cart.map((item) => (
        <div key={item._id}>
          {item.name} - ₹{item.price}
          <button onClick={() => deleteItem(item._id)}>❌</button>
        </div>
      ))}

      <h3>Total: ₹{total}</h3>
    </div>
  );
}

export default App;