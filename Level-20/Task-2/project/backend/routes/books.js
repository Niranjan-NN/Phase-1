import express from 'express';
import Book from '../models/Book.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get all books for current user
router.get('/', auth, async (req, res) => {
  try {
    const books = await Book.find({ user: req.user._id })
      .sort({ addedAt: -1 });
    
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get a specific book
router.get('/:id', auth, async (req, res) => {
  try {
    const book = await Book.findOne({ 
      _id: req.params.id,
      user: req.user._id 
    });
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add a book to collection
router.post('/', auth, async (req, res) => {
  try {
    const { externalId, title, authors, publishedYear, description, coverImage, category } = req.body;
    
    // Check if book already exists for this user
    const existingBook = await Book.findOne({ 
      user: req.user._id,
      externalId 
    });
    
    if (existingBook) {
      return res.status(400).json({ 
        message: 'Book already exists in your collection' 
      });
    }
    
    // Create new book
    const book = new Book({
      user: req.user._id,
      externalId,
      title,
      authors,
      publishedYear,
      description,
      coverImage,
      category: category || 'Want to Read'
    });
    
    await book.save();
    
    res.status(201).json({
      message: 'Book added to collection',
      book
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update a book
router.patch('/:id', auth, async (req, res) => {
  try {
    const updates = req.body;
    const allowedUpdates = ['category', 'rating', 'notes'];
    
    // Filter out invalid update fields
    const validUpdates = Object.keys(updates)
      .filter(update => allowedUpdates.includes(update))
      .reduce((obj, key) => {
        obj[key] = updates[key];
        return obj;
      }, {});
    
    if (Object.keys(validUpdates).length === 0) {
      return res.status(400).json({ message: 'No valid updates provided' });
    }
    
    const book = await Book.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      validUpdates,
      { new: true, runValidators: true }
    );
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    res.json({
      message: 'Book updated successfully',
      book
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete a book
router.delete('/:id', auth, async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({ 
      _id: req.params.id,
      user: req.user._id 
    });
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    res.json({ 
      message: 'Book removed from collection',
      bookId: req.params.id
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;