import React, { useState } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import "./App.css";

// Import the same image for all products
import smartphoneImg from "./assets/smartphone.jpeg";

const App = () => {
  const products = [
    { id: 1, name: "Smartphone", imageUrl: smartphoneImg, price: 49999 },
    { id: 2, name: "Wireless Headphones", imageUrl: smartphoneImg, price: 149 },
    { id: 3, name: "Smartwatch", imageUrl: smartphoneImg, price: 500 },
    { id: 4, name: "Gaming Laptop", imageUrl: smartphoneImg, price: 70000 },
  ];

  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="container">
      <h1 className="title">E-Commerce Product Listing</h1>
      <Cart cart={cart} />
      <ProductList products={products} addToCart={addToCart} />
    </div>
  );
};

export default App;
