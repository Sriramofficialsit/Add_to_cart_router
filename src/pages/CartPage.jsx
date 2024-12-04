import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CartPage = () => {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const updateQuantity = (id, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountedTotal = total * 0.9;

  return (
    <div className="p-4 bg-slate-700 h-full">
      <h1 className="text-2xl font-bold mb-4 text-white">Cart</h1>
      <Link to="/" className="bg-blue-500 text-white p-2 rounded mb-4 inline-block ">
        Back to Products
      </Link>
      {cart.length > 0 ? (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="border p-4 rounded shadow-xl shadow-black mb-4 bg-white">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-gray-500">${item.price}</p>
              <div className="flex items-center space-x-2">
                <button
                  className="bg-gray-300 px-2 rounded"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className="bg-gray-300 px-2 rounded"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
                <button
                  className="bg-red-500 text-white p-2 rounded ml-4"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
              <p className="font-bold">Total: ${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
          <h2 className="text-xl font-bold text-white">Subtotal: ${total.toFixed(2)}</h2>
          <h2 className="text-xl font-bold text-white">Discounted Total: ${discountedTotal.toFixed(2)}</h2>
        </div>
      ) : (
        <p className="text-white">Your cart is empty!</p>
      )}
    </div>
  );
};

export default CartPage;
