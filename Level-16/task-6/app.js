const express = require('express');
const path = require('path');

const app = express();

// 🆕 Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Existing routes...
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

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
