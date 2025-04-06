// Import express
const express = require('express');

// Create an Express app
const app = express();

// Basic routes
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
        { id: 1, name: 'Niju', email: 'niranjan@example.com' },
        { id: 2, name: 'Kavzz', email: 'kavzz@example.com' },
        { id: 3, name: 'Visa', email: 'visaa@example.com' },
        { id: 4, name: 'Pandu', email: 'banduu@example.com' },
      ];

  res.json(users);
});

// 🆕 Route with parameter: /users/:id
app.get('/users/:id', (req, res) => {
  const userId = req.params.id; // Extract 'id' from URL
  res.send(`User ID: ${userId}`);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
