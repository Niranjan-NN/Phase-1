import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Generate JWT token method
userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    { id: this._id, username: this.username }, 
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
  return token;
};

const User = mongoose.model('User', userSchema);

export default User;