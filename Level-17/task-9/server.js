const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/userModel');
const Product = require('./models/productModel');
const Order = require('./models/orderModel');
const AppError = require('./utils/AppError');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

// 🔄 Create Order with Transaction
app.post('/api/orders', async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { userId, items } = req.body;
    const user = await User.findById(userId).session(session);
    if (!user) throw new AppError('User not found', 404);

    let totalAmount = 0;
    const productUpdates = [];

    for (const item of items) {
      const product = await Product.findById(item.product).session(session);
      if (!product || product.stock < item.quantity) {
        throw new AppError(`Product unavailable: ${item.product}`, 400);
      }

      product.stock -= item.quantity;
      totalAmount += product.price * item.quantity;
      productUpdates.push(product.save({ session }));
    }

    const order = new Order({ user: user._id, products: items, totalAmount });
    await order.save({ session });

    user.purchaseHistory.push(order._id);
    await user.save({ session });
    await Promise.all(productUpdates);

    await session.commitTransaction();
    res.status(201).json({ message: 'Order created successfully', order });

  } catch (err) {
    await session.abortTransaction();
    next(err);
  } finally {
    session.endSession();
  }
});

// ✅ GET: All Orders
app.get('/api/orders', async (req, res, next) => {
  try {
    const orders = await Order.find().populate('user products.product');
    res.json({ orders });
  } catch (err) {
    next(err);
  }
});

// 🏠 Root Route
app.get('/', (req, res) => {
  res.send('🛒 Order API with Transactions is running...');
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
