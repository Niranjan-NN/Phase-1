const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./userModel');

dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// ✅ Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

// ✅ Create User (Triggers pre/post save hooks)
app.post('/api/users', async (req, res) => {
  try {
    const { name, email, password, age } = req.body;
    const user = new User({ name, email, password, age });
    await user.save();
    res.status(201).json(user.getProfile()); // ✅ Fixed method name
  } catch (err) {
    res.status(500).json({ message: 'User creation failed', error: err.message });
  }
});

// ✅ Get Active Users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find(); // Automatically filters out inactive
    res.json(users.map(user => user.getProfile())); // ✅ Fixed method name
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// ✅ Get users by email domain
app.get('/api/users/domain/:domain', async (req, res) => {
  try {
    const domain = req.params.domain;
    const users = await User.findByEmailDomain(domain);
    res.json(users.map(user => user.getProfile())); // ✅ Fixed method name
  } catch (err) {
    res.status(500).json({ message: 'Error fetching by domain' });
  }
});

// ✅ Root Test
app.get('/', (req, res) => {
  res.send('🚀 Middleware & Hooks API is running');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
