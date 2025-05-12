const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./productModel');

dotenv.config();

const products = [
  { name: 'iPhone 14', price: 999, category: 'Electronics', stock: 20 },
  { name: 'Galaxy S23', price: 899, category: 'Electronics', stock: 15 },
  { name: 'MacBook Air', price: 1299, category: 'Computers', stock: 10 },
  { name: 'Asus Laptop', price: 749, category: 'Computers', stock: 8 },
  { name: 'Wireless Mouse', price: 29, category: 'Accessories', stock: 50 },
  { name: 'Bluetooth Headphones', price: 199, category: 'Accessories', stock: 30 },
  { name: 'Sony TV', price: 599, category: 'Electronics', stock: 5 },
  { name: 'Canon Camera', price: 699, category: 'Electronics', stock: 4 },
  { name: 'Water Bottle', price: 15, category: 'Home', stock: 100 },
  { name: 'Microwave Oven', price: 120, category: 'Home', stock: 12 },
  { name: 'Mechanical Keyboard', price: 99, category: 'Accessories', stock: 25 },
  { name: 'iPad Pro', price: 799, category: 'Electronics', stock: 18 },
  { name: 'Dell Monitor', price: 179, category: 'Computers', stock: 20 },
  { name: 'Pen Drive', price: 20, category: 'Accessories', stock: 200 },
  { name: 'Fitness Band', price: 49, category: 'Accessories', stock: 70 },
  { name: 'Smartwatch', price: 150, category: 'Electronics', stock: 40 },
  { name: 'Iron Box', price: 45, category: 'Home', stock: 22 },
  { name: 'Electric Kettle', price: 35, category: 'Home', stock: 30 },
  { name: 'Google Pixel', price: 899, category: 'Electronics', stock: 6 },
  { name: 'Gaming Chair', price: 250, category: 'Furniture', stock: 10 },
];

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  await Product.deleteMany();
  await Product.insertMany(products);
  console.log('✅ Seeded successfully');
  process.exit();
}).catch(err => console.error('❌ Seed error:', err));
