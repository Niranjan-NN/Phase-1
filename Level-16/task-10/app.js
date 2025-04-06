const express = require('express');
const path = require('path');
const app = express();

const PORT = 3000;
const ENV = process.env.NODE_ENV || 'development';

// Middleware to parse JSON
app.use(express.json());

// ✅ Sample working route
app.get('/', (req, res) => {
  res.send('Welcome to the Express Server!');
});

// ✅ Route that manually throws an error
app.get('/error', (req, res, next) => {
  const err = new Error('Something went wrong!');
  err.status = 500;
  next(err); // Pass the error to error handler
});

// ✅ Route that simulates a missing resource
app.get('/products/:id', (req, res, next) => {
  const product = null; // Simulate no product
  if (!product) {
    const err = new Error(`Product with ID ${req.params.id} not found`);
    err.status = 404;
    return next(err);
  }
  res.json(product);
});

// ✅ Static HTML error page (for HTML routes)
app.use(express.static(path.join(__dirname, 'public')));

// ✅ 404 Middleware
app.use((req, res, next) => {
  const err = new Error('Route Not Found');
  err.status = 404;
  next(err);
});

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  const status = err.status || 500;

  if (req.headers.accept && req.headers.accept.includes('application/json')) {
    // JSON error response for API
    res.status(status).json({
      error: {
        message: err.message,
        ...(ENV === 'development' && { stack: err.stack }),
      }
    });
  } else {
    // HTML response for browser
    res.status(status);
    if (ENV === 'development') {
      res.send(`
        <h1>Error ${status}</h1>
        <p>${err.message}</p>
        <pre>${err.stack}</pre>
      `);
    } else {
      res.sendFile(path.join(__dirname, 'public', 'error.html'));
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
