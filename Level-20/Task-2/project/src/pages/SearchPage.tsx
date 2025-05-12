import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import SearchBar from '../components/search/SearchBar';
import BookGrid from '../components/books/BookGrid';
import { searchBooks, addBookToCollection } from '../services/bookService';

interface BookResult {
  externalId: string;
  title: string;
  authors: string[];
  publishedYear?: number;
  coverImage?: string;
}

const SearchPage: React.FC = () => {
  const [books, setBooks] = useState<BookResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    
    try {
      const results = await searchBooks(query);
      setBooks(results);
    } catch (err: any) {
      console.error('Search error:', err);
      setError('Failed to search for books. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleAddToCollection = async (book: BookResult) => {
    try {
      setSuccessMessage(null);
      await addBookToCollection({
        externalId: book.externalId,
        title: book.title,
        authors: book.authors,
        publishedYear: book.publishedYear,
        coverImage: book.coverImage,
        category: 'Want to Read'
      });
      setSuccessMessage(`"${book.title}" added to your collection.`);
    } catch (err: any) {
      console.error('Add to collection error:', err);
      setError(err.response?.data?.message || 'Failed to add book to collection.');
    }
  };
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-gray-800 mb-4">Discover Books</h1>
        <p className="text-gray-600 mb-6">
          Search for books by title, author, or keywords to add to your collection.
        </p>
        <SearchBar onSearch={handleSearch} />
      </div>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-red-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
      
      {successMessage && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded">
          <p className="text-sm text-green-700">{successMessage}</p>
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
        </div>
      ) : (
        <>
          {books.length > 0 ? (
            <>
              <p className="text-gray-600 mb-4">{books.length} books found</p>
              <BookGrid books={books} onAddToCollection={handleAddToCollection} />
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">
                Search for books to add to your collection.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchPage;