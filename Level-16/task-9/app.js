const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'form.html'));
});

// Handle form submission
app.post('/submit', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.send(`<h2>Error: All fields are required.</h2><a href="/">Go Back</a>`);
  }

  res.send(`
    <h2>Form Submitted Successfully!</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong> ${message}</p>
    <a href="/">Go Back</a>
  `);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
