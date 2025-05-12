const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/productModel');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  console.log('🔄 Seeding products...');
  await Product.deleteMany();

  const categories = ['Electronics', 'Clothing', 'Books'];
  const products = Array.from({ length: 20 }).map((_, i) => ({
    name: `Product ${i + 1}`,
    price: Math.floor(Math.random() * 100) + 10,
    stock: Math.floor(Math.random() * 50) + 1,
    category: categories[Math.floor(Math.random() * categories.length)]
  }));

  await Product.insertMany(products);
  console.log('Products seeded');
  mongoose.connection.close();
});
