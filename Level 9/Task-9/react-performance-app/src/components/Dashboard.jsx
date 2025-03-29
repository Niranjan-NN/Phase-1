import React, { useCallback, useState } from 'react';
import ProductCard from './ProductCard';

const products = [
  { id: 1, name: 'Product A', price: 25 },
  { id: 2, name: 'Product B', price: 40 },
];

const Dashboard = () => {
  const [cart, setCart] = useState([]);

  const handleAddToCart = useCallback((product) => {
    setCart((prevCart) => [...prevCart, product]);
  }, []);

  return (
    <div>
      {products.map((product) => (
        <ProductCard 
          key={product.id}
          product={product}
          onAddToCart={() => handleAddToCart(product)}
        />
      ))}
      <h3>Cart: {cart.length} items</h3>
    </div>
  );
};

export default Dashboard;
