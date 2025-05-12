import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, BookOpen, FileText } from 'lucide-react';
import { getUserBooks } from '../services/bookService';

interface BookWithNotes {
  _id: string;
  title: string;
  authors: string[];
  coverImage?: string;
  notes: string;
  category: string;
  rating: number;
}

const NotesPage: React.FC = () => {
  const [books, setBooks] = useState<BookWithNotes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchBooksWithNotes = async () => {
      try {
        setLoading(true);
        const allBooks = await getUserBooks();
        // Filter only books with notes
        const booksWithNotes = allBooks.filter(
          (book: any) => book.notes && book.notes.trim() !== ''
        );
        setBooks(booksWithNotes);
      } catch (err) {
        console.error('Error fetching books with notes:', err);
        setError('Failed to load your notes. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBooksWithNotes();
  }, []);
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Read':
        return 'bg-green-500';
      case 'Currently Reading':
        return 'bg-blue-500';
      case 'Want to Read':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-gray-800 mb-2">My Notes</h1>
        <p className="text-gray-600">
          Review and manage your personal notes on books
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
      
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
        </div>
      ) : (
        <>
          {books.length > 0 ? (
            <div className="space-y-6">
              {books.map((book) => (
                <div key={book._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/4 p-4 flex md:block">
                      <div className="w-20 h-28 md:w-40 md:h-56 bg-gray-200 rounded-md overflow-hidden shadow-sm">
                        {book.coverImage ? (
                          <img 
                            src={book.coverImage} 
                            alt={`Cover for ${book.title}`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100">
                            <BookOpen size={32} className="text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className={`${getCategoryColor(book.category)} text-white text-xs px-2 py-1 rounded-full mt-2 inline-block`}>
                        {book.category}
                      </div>
                    </div>
                    
                    <div className="md:w-3/4 p-4 md:p-6 flex flex-col">
                      <div className="mb-3">
                        <Link 
                          to={`/book/${book._id}`}
                          className="text-xl md:text-2xl font-serif font-bold text-gray-800 hover:text-teal-700 transition-colors"
                        >
                          {book.title}
                        </Link>
                        <p className="text-gray-600 text-sm md:text-base">
                          {book.authors.join(', ')}
                        </p>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-md flex-grow mb-4">
                        <div className="flex items-center mb-2 text-gray-700">
                          <FileText size={16} className="mr-2" />
                          <span className="font-medium">Your Notes</span>
                        </div>
                        <p className="text-gray-700 whitespace-pre-line">
                          {book.notes}
                        </p>
                      </div>
                      
                      <Link 
                        to={`/book/${book._id}`}
                        className="self-start text-teal-600 hover:text-teal-800 hover:underline text-sm flex items-center"
                      >
                        Edit Notes
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <FileText size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 mb-4">
                You haven't added notes to any books yet.
              </p>
              <Link 
                to="/my-books" 
                className="text-teal-600 hover:text-teal-800 hover:underline"
              >
                Go to My Books to add notes
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NotesPage;