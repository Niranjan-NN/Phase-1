// server.js
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectDB = require('./db');
const User = require('./userModel');

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// 🧪 Test Schema Route
app.get('/user-schema', (req, res) => {
  res.json({ fields: Object.keys(User.schema.paths) });
});

// ✅ CREATE USER - POST /api/users
app.post('/api/users', async (req, res) => {
  try {
    const { name, email, age } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }
    if (age && age < 18) {
      return res.status(400).json({ message: 'Age must be at least 18' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const user = new User({ name, email, age });
    await user.save();

    res.status(201).json(user);
  } catch (err) {
    console.error('❌ Error creating user:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});


// ✅ READ USERS - GET /api/users?limit=5&skip=0&name=Niranjan
app.get('/api/users', async (req, res) => {
  try {
    const { limit = 5, skip = 0, name, email } = req.query;

    const filter = {};
    if (name) filter.name = new RegExp(name, 'i');
    if (email) filter.email = new RegExp(email, 'i');

    const users = await User.find(filter)
      .skip(Number(skip))
      .limit(Number(limit));

    res.json(users);
  } catch (err) {
    console.error('❌ Error fetching users:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});


// ✅ READ SINGLE USER BY ID - GET /api/users/:id
app.get('/api/users/:id', async (req, res) => {
  const { id } = req.params;

  // Check for invalid ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    console.error('❌ Error fetching user:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
