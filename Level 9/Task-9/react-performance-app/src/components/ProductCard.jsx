import React from 'react';

const ProductCard = React.memo(({ product, onAddToCart }) => {
  console.log(`Rendering Product: ${product.name}`);
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={onAddToCart}>Add to Cart</button>
    </div>
  );
});

export default ProductCard;
