const express = require('express');

const app = express();

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

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
