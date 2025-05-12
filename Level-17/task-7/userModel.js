const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  age: Number,
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});


userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.post('save', function (doc) {
  console.log(`New user created: ${doc.name}`);
});

userSchema.pre(/^find/, function (next) {
  this.where({ isActive: true });
  next();
});

// 👤 Instance method - return user profile
userSchema.methods.getProfile = function () {
  return {
    id: this._id,
    name: this.name,
    email: this.email
  };
};

// 📧 Static method - find users by email domain
userSchema.statics.findByEmailDomain = function (domain) {
  return this.find({ email: new RegExp(`@${domain}$`) });
};

module.exports = mongoose.model('User', userSchema);
