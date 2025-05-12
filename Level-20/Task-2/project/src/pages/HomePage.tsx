import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Search, BookmarkIcon, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-16 px-4 bg-gradient-to-r from-teal-700 to-teal-900 text-white rounded-lg shadow-xl">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
          Your personal bookshelf, <span className="text-teal-300">digitized</span>
        </h1>
        <p className="text-xl max-w-3xl mx-auto mb-8 text-teal-100">
          Keep track of your reading journey, discover new books, and never forget what you've read again.
        </p>
        {isAuthenticated ? (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/search"
              className="inline-flex items-center bg-white text-teal-800 px-6 py-3 rounded-lg font-medium text-lg hover:bg-gray-100 transition-colors"
            >
              <Search className="mr-2" size={20} />
              Find Books
            </Link>
            <Link
              to="/my-books"
              className="inline-flex items-center bg-teal-600 text-white px-6 py-3 rounded-lg font-medium text-lg hover:bg-teal-500 transition-colors"
            >
              <BookmarkIcon className="mr-2" size={20} />
              My Collection
            </Link>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="inline-flex items-center bg-white text-teal-800 px-6 py-3 rounded-lg font-medium text-lg hover:bg-gray-100 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center bg-teal-600 text-white px-6 py-3 rounded-lg font-medium text-lg hover:bg-teal-500 transition-colors"
            >
              Register Now
            </Link>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="py-12">
        <h2 className="text-3xl font-serif font-bold text-center mb-12">Everything you need for your reading journey</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-teal-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <Search className="text-teal-700" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-2">Find Books</h3>
            <p className="text-gray-600">
              Search for books by title, author, or keywords and discover your next great read.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-teal-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <BookmarkIcon className="text-teal-700" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-2">Track Your Reading</h3>
            <p className="text-gray-600">
              Organize your books by reading status: Read, Currently Reading, or Want to Read.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-teal-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <Star className="text-teal-700" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-2">Rate and Review</h3>
            <p className="text-gray-600">
              Add personal ratings and notes to remember your thoughts about each book.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to start your digital bookshelf?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Join thousands of readers who organize their reading life with BookShelf. Sign up for free and start tracking your books today.
        </p>
        {!isAuthenticated && (
          <Link
            to="/register"
            className="inline-block bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors"
          >
            Create Your BookShelf
          </Link>
        )}
      </section>
    </div>
  );
};

export default HomePage;