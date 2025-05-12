const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app = express(); // ✅ This must come BEFORE any app.get/put/delete/etc.

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mydb';

app.use(express.json()); // ✅ Middleware to parse JSON

// ✅ Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Define User model
const User = require('./userModel');

// ✅ Default Route
app.get('/', (req, res) => {
  res.send('Connected to MongoDB');
});

// ✅ Create User - POST
app.post('/api/users', async (req, res) => {
  try {
    const { name, email, age } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    if (age < 18) {
      return res.status(400).json({ message: 'Age must be at least 18' });
    }

    const newUser = new User({ name, email, age });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ message: 'Email already exists' });
    } else {
      console.error('Error creating user:', err.message);
      res.status(500).json({ message: 'Server error' });
    }
  }
});

// ✅ Get Users with Pagination and Filter
app.get('/api/users', async (req, res) => {
  try {
    const { page = 1, limit = 5, name, email } = req.query;
    const filter = { isActive: true };
    if (name) filter.name = new RegExp(name, 'i');
    if (email) filter.email = new RegExp(email, 'i');

    const users = await User.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Get Single User by ID
app.get('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    const user = await User.findById(id);
    if (!user || !user.isActive) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Update User - PUT
app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    const updateFields = {};
    if (name) updateFields.name = name;
    if (email) updateFields.email = email;
    if (age) {
      if (age < 18) return res.status(400).json({ message: 'Age must be at least 18' });
      updateFields.age = age;
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateFields, {
      new: true,
      runValidators: true
    });

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'User updated', user: updatedUser });
  } catch (err) {
    console.error('Error updating user:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Soft Delete User - DELETE
app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.isActive = false;
    await user.save();

    res.json({ message: 'User soft-deleted (isActive: false)' });
  } catch (err) {
    console.error('Error deleting user:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
