const express = require('express');
const path = require('path');

const app = express();

// ✅ Custom Middleware for Logging
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next(); // Move to the next middleware/route
});

// ✅ Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Routes
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.get('/about', (req, res) => {
  res.send('About Us page');
});

app.get('/contact', (req, res) => {
  res.send('Contact Us page');
});

app.get('/services', (req, res) => {
  res.send('Our Services page');
});

app.get('/api/users', (req, res) => {
  const users = [
    { id: 1, name: 'Niranjan NN', email: 'niranjan@example.com' },
    { id: 2, name: 'Dinesh Kumar', email: 'dinesh@example.com' },
    { id: 3, name: 'Visalachi R', email: 'visalachi@example.com' },
  ];

  res.json(users);
});

app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`User ID: ${userId}`);
});

app.get('/search', (req, res) => {
  const query = req.query.q;
  const limit = req.query.limit || 5;

  if (!query) {
    return res.send('Please provide a search query using ?q=');
  }

  res.send(`Search for: ${query}, Limit: ${limit}`);
});

// ✅ Server Listen
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
