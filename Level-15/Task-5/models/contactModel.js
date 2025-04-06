const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  address: { type: String },
  group: { type: String, default: "General" },
}, {
  timestamps: true
});

module.exports = mongoose.model("Contact", contactSchema, "contactBook");
