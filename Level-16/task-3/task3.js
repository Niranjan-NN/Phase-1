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
    { id: 1, name: 'Niju', email: 'niranjan@example.com' },
    { id: 2, name: 'Kavzz', email: 'kavzz@example.com' },
    { id: 3, name: 'Visa', email: 'visaa@example.com' },
    { id: 4, name: 'Pandu', email: 'banduu@example.com' },
  ];

  res.json(users); // Send as JSON
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
