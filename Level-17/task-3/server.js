// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');
const User = require('./userModel');

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Test route
app.get('/user-schema', (req, res) => {
  res.json({
    fields: Object.keys(User.schema.paths),
  });
});

// ✅ POST /api/users - Create a new user
app.post('/api/users', async (req, res) => {
  try {
    const { name, email, age } = req.body;

    // Basic validation
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    if (age && age < 18) {
      return res.status(400).json({ message: 'Age must be at least 18' });
    }

    // Check for duplicate email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Create user
    const user = new User({ name, email, age });
    await user.save();

    res.status(201).json(user);
  } catch (err) {
    console.error('❌ Error creating user:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
