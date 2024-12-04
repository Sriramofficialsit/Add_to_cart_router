import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      if (prevCart.some((item) => item.id === product.id)) {
        return prevCart.filter((item) => item.id !== product.id);
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <div className="p-4 bg-slate-700">
      <h1 className="text-2xl font-bold mb-4 text-white">Products</h1>
      <Link to="/cart" className="bg-blue-500 text-white p-2 rounded mb-4 inline-block">
        Go to Cart ({cart.length})
      </Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow-xl shadow-black bg-white">
            <img src={product.image} alt={product.title} className="h-40 mx-auto" />
            <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
            <p className="text-gray-500">{product.description.substring(0, 50)}...</p>
            <p className="text-xl font-bold">${product.price}</p>
            <button
              className={`mt-2 w-full ${
                cart.some((item) => item.id === product.id) ? "bg-red-500" : "bg-green-500"
              } text-white p-2 rounded`}
              onClick={() => addToCart(product)}
            >
              {cart.some((item) => item.id === product.id) ? "Remove from Cart" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
