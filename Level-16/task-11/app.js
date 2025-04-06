// app.js
const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(express.static('public'));


// Middleware to serve static files
app.use(express.static('public'));

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = allowedTypes.test(file.mimetype);
  if (extName && mimeType) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

// Serve form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/upload.html');
});

// Handle file upload
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded or invalid file type.');
  }

  res.send(`
    <h2>Upload Successful!</h2>
    <p>Filename: ${req.file.filename}</p>
    <img src="/uploads/${req.file.filename}" alt="Uploaded Image" style="max-width:300px;">
  `);
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).send(`<h3>Error: ${err.message}</h3>`);
});

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
