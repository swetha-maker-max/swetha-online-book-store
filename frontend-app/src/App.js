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

  const addToCart = (book) => {
    fetch(`${API_URL}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(book)
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        getCart();
      });
  };

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