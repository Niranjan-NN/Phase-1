import express from 'express';
import axios from 'axios';
import NodeCache from 'node-cache';
import auth from '../middleware/auth.js';

const router = express.Router();
const cache = new NodeCache({ stdTTL: 3600 }); // Cache for 1 hour

// Search for books
router.get('/', auth, async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query || query.trim().length < 2) {
      return res.status(400).json({ 
        message: 'Search query must be at least 2 characters' 
      });
    }
    
    // Check cache first
    const cacheKey = `search_${query.toLowerCase().trim()}`;
    const cachedResults = cache.get(cacheKey);
    
    if (cachedResults) {
      return res.json({
        message: 'Books found (cached)',
        books: cachedResults
      });
    }
    
    // Using Open Library API
    const response = await axios.get(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=20`
    );
    
    // Process and format the results
    const books = response.data.docs.map(book => ({
      externalId: book.key,
      title: book.title,
      authors: book.author_name || [],
      publishedYear: book.first_publish_year,
      coverImage: book.cover_i 
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` 
        : null,
    }));
    
    // Save to cache
    cache.set(cacheKey, books);
    
    res.json({
      message: 'Books found',
      books
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error searching for books', 
      error: error.message 
    });
  }
});

// Get book details
router.get('/details/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check cache first
    const cacheKey = `book_${id}`;
    const cachedBook = cache.get(cacheKey);
    
    if (cachedBook) {
      return res.json({
        message: 'Book details found (cached)',
        book: cachedBook
      });
    }
    
    // Get book details from Open Library
    const response = await axios.get(
      `https://openlibrary.org${id}.json`
    );
    
    // Get additional details like description if available
    let description = '';
    if (response.data.works && response.data.works[0]) {
      const workResponse = await axios.get(
        `https://openlibrary.org${response.data.works[0].key}.json`
      );
      description = workResponse.data.description?.value || 
                   workResponse.data.description || 
                   '';
    }
    
    // Get author details
    let authors = [];
    if (response.data.authors) {
      const authorPromises = response.data.authors.map(async author => {
        const authorResponse = await axios.get(
          `https://openlibrary.org${author.key}.json`
        );
        return authorResponse.data.name;
      });
      
      authors = await Promise.all(authorPromises);
    }
    
    const book = {
      externalId: id,
      title: response.data.title,
      authors,
      publishedYear: response.data.publish_date 
        ? parseInt(response.data.publish_date.split(' ').pop()) 
        : null,
      description,
      coverImage: response.data.covers && response.data.covers.length > 0
        ? `https://covers.openlibrary.org/b/id/${response.data.covers[0]}-L.jpg`
        : null
    };
    
    // Save to cache
    cache.set(cacheKey, book);
    
    res.json({
      message: 'Book details found',
      book
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching book details', 
      error: error.message 
    });
  }
});

export default router;