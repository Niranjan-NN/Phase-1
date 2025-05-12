import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  externalId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  authors: [{
    type: String
  }],
  publishedYear: {
    type: Number
  },
  description: {
    type: String
  },
  coverImage: {
    type: String
  },
  category: {
    type: String,
    enum: ['Read', 'Currently Reading', 'Want to Read'],
    default: 'Want to Read'
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  notes: {
    type: String,
    default: ''
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Create compound index for user+externalId to prevent duplicates
bookSchema.index({ user: 1, externalId: 1 }, { unique: true });

const Book = mongoose.model('Book', bookSchema);

export default Book;