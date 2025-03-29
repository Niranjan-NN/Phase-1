import React from 'react';
import { useParams } from 'react-router-dom';

const products = [
  { id: 1, name: 'Product A', details: 'Details about Product A' },
  { id: 2, name: 'Product B', details: 'Details about Product B' },
  { id: 3, name: 'Product C', details: 'Details about Product C' }
];

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id.toString() === id);

  if (!product) return <h1>Product Not Found</h1>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.details}</p>
    </div>
  );
};

export default ProductDetail;
