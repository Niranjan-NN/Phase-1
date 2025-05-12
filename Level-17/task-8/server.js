const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./productModel');

dotenv.config();
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true, useUnifiedTopology: true
})
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

// 📊 Get statistics by category
app.get('/api/products/stats', async (req, res) => {
  try {
    const stats = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          totalProducts: { $sum: 1 },
          avgPrice: { $avg: "$price" },
          totalStock: { $sum: "$stock" }
        }
      }
    ]);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: 'Aggregation failed' });
  }
});

// 🔍 Complex query (e.g., price between range, category match, stock > 0)
app.get('/api/products/filter', async (req, res) => {
  try {
    const { minPrice, maxPrice, category } = req.query;
    const filter = {
      price: { $gte: Number(minPrice) || 0, $lte: Number(maxPrice) || 10000 },
      ...(category && { category }),
      stock: { $gt: 0 }
    };
    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Query error' });
  }
});

// 🔎 Text search
app.get('/api/products/search', async (req, res) => {
  try {
    const { keyword } = req.query;
    const results = await Product.find({ $text: { $search: keyword } });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Search failed' });
  }
});

// 📈 Average prices by category
app.get('/api/products/average-price', async (req, res) => {
  try {
    const avg = await Product.aggregate([
      { $group: { _id: "$category", avgPrice: { $avg: "$price" } } }
    ]);
    res.json(avg);
  } catch (err) {
    res.status(500).json({ message: 'Average calculation failed' });
  }
});

// 🔃 Sort & filter
app.get('/api/products/sort', async (req, res) => {
  try {
    const { sortBy = 'price', order = 'asc' } = req.query;
    const sortOrder = order === 'desc' ? -1 : 1;
    const sorted = await Product.find().sort({ [sortBy]: sortOrder });
    res.json(sorted);
  } catch (err) {
    res.status(500).json({ message: 'Sorting failed' });
  }
});

app.get('/', (req, res) => {
  res.send('🚀 Advanced Querying & Aggregation API Running');
});

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);
});
