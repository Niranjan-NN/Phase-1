const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// In-memory product database
let products = [
  { id: 1, name: 'Laptop', price: 1500, description: 'Powerful laptop' },
  { id: 2, name: 'Phone', price: 800, description: 'Smartphone with great camera' },
  { id: 3, name: 'Headphones', price: 200, description: 'Noise-cancelling headphones' },
];

// GET /products - Get all products
app.get('/products', (req, res) => {
  res.status(200).json(products);
});

// GET /products/:id - Get a specific product
app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.status(200).json(product);
});

// POST /products - Add a new product
app.post('/products', (req, res) => {
  const { name, price, description } = req.body;

  if (!name || !price || !description) {
    return res.status(400).json({ message: 'Please provide name, price, and description' });
  }

  const newProduct = {
    id: products.length + 1,
    name,
    price,
    description,
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT /products/:id - Update a product
app.put('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, price, description } = req.body;
  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  if (name) product.name = name;
  if (price) product.price = price;
  if (description) product.description = description;

  res.status(200).json(product);
});

// DELETE /products/:id - Delete a product
app.delete('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }

  products.splice(index, 1);
  res.status(200).json({ message: 'Product deleted successfully' });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
