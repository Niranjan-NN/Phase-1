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

// Test route to return the User schema structure
app.get('/user-schema', (req, res) => {
  res.json({
    fields: Object.keys(User.schema.paths)
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
