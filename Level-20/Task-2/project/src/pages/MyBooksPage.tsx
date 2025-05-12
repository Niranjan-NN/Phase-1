import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import BookGrid from '../components/books/BookGrid';
import BookFilter from '../components/books/BookFilter';
import { getUserBooks } from '../services/bookService';

interface Book {
  _id: string;
  externalId: string;
  title: string;
  authors: string[];
  publishedYear?: number;
  coverImage?: string;
  category: string;
  rating: number;
  addedAt: string;
}

const MyBooksPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState('dateAdded:desc');
  
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const booksData = await getUserBooks();
        setBooks(booksData);
      } catch (err) {
        console.error('Error fetching books:', err);
        setError('Failed to load your books. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBooks();
  }, []);
  
  useEffect(() => {
    // Filter books by category
    let filtered = [...books];
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(book => book.category === selectedCategory);
    }
    
    // Sort books
    const [sortField, sortDirection] = sortOption.split(':');
    filtered.sort((a, b) => {
      if (sortField === 'dateAdded') {
        return sortDirection === 'desc'
          ? new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
          : new Date(a.addedAt).getTime() - new Date(b.addedAt).getTime();
      } else if (sortField === 'rating') {
        return sortDirection === 'desc'
          ? b.rating - a.rating
          : a.rating - b.rating;
      } else if (sortField === 'title') {
        return sortDirection === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }
      return 0;
    });
    
    setFilteredBooks(filtered);
  }, [books, selectedCategory, sortOption]);
  
  const bookCountByCategory = {
    'All': books.length,
    'Read': books.filter(book => book.category === 'Read').length,
    'Currently Reading': books.filter(book => book.category === 'Currently Reading').length,
    'Want to Read': books.filter(book => book.category === 'Want to Read').length
  };
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-gray-800 mb-2">My Books</h1>
        <p className="text-gray-600">
          Manage your personal book collection
        </p>
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
      
      <BookFilter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />
      
      <div className="mb-6 flex flex-wrap gap-3">
        {Object.entries(bookCountByCategory).map(([category, count]) => (
          <div 
            key={category}
            className={`px-4 py-2 rounded-md ${
              selectedCategory === category 
                ? 'bg-teal-100 text-teal-800' 
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {category}: <span className="font-semibold">{count}</span>
          </div>
        ))}
      </div>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
        </div>
      ) : (
        <>
          {filteredBooks.length > 0 ? (
            <BookGrid 
              books={filteredBooks} 
              showRating 
              showCategory
            />
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <p className="text-gray-500 mb-4">
                {selectedCategory === 'All'
                  ? "You haven't added any books to your collection yet."
                  : `You don't have any books in the "${selectedCategory}" category.`}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyBooksPage;