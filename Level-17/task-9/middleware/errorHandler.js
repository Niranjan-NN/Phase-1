const AppError = require('../utils/AppError');

module.exports = (err, req, res, next) => {
  console.error('❌ Error:', err);
  if (!err.isOperational) {
    err = new AppError('Something went wrong', 500);
  }
  res.status(err.statusCode || 500).json({ status: err.status, message: err.message });
};
