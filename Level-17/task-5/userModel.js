// userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, min: 18 },
  createdAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }  // 🆕 Soft delete flag
});

module.exports = mongoose.model('User', userSchema);
