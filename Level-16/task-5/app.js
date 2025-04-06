// Import express
const express = require('express');

// Create an Express app
const app = express();

// Root route
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

// About route
app.get('/about', (req, res) => {
  res.send('About Us page');
});

// Contact route
app.get('/contact', (req, res) => {
  res.send('Contact Us page');
});

// Services route
app.get('/services', (req, res) => {
  res.send('Our Services page');
});

// JSON Route: /api/users
app.get('/api/users', (req, res) => {
  const users = [
    { id: 1, name: 'Niranjan NN', email: 'niranjan@example.com' },
    { id: 2, name: 'Dinesh Kumar', email: 'dinesh@example.com' },
    { id: 3, name: 'Visalachi R', email: 'visalachi@example.com' },
  ];

  res.json(users); // Send as JSON
});

// Route Parameters: /users/:id
app.get('/users/:id', (req, res) => {
  const userId = req.params.id; // Extract 'id' from URL
  res.send(`User ID: ${userId}`);
});

// Query Parameters: /search?q=express&limit=10
app.get('/search', (req, res) => {
  const query = req.query.q;
  const limit = req.query.limit || 5; // Default to 5

  if (!query) {
    return res.send('Please provide a search query using ?q=');
  }

  res.send(`Search for: ${query}, Limit: ${limit}`);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
