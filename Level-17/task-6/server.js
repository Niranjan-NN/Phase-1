const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./userModel');
const Post = require('./postModel');

dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

// ✅ Create Post
app.post('/api/posts', async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const user = await User.findById(author);
    if (!user) return res.status(404).json({ message: 'Author not found' });

    const newPost = new Post({ title, content, author });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ message: 'Error creating post', error: err.message });
  }
});

// ✅ Get all posts with populated author info
app.get('/api/posts', async (req, res) => {
  try {
    const { author } = req.query;
    const filter = author ? { author } : {};
    const posts = await Post.find(filter).populate('author', 'name email age');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching posts' });
  }
});

// ✅ Get posts by user ID
app.get('/api/users/:id/posts', async (req, res) => {
  try {
    const userId = req.params.id;
    const userExists = await User.findById(userId);
    if (!userExists) return res.status(404).json({ message: 'User not found' });

    const posts = await Post.find({ author: userId }).populate('author', 'name email');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user posts' });
  }
});

// ✅ Default route
app.get('/', (req, res) => {
  res.send('🎉 Relationship & Population Working!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
