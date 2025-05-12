import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookOpen, Clock, BookmarkIcon, Check, AlertCircle, ChevronLeft, Trash2 } from 'lucide-react';
import { getBookDetails, updateBook, removeBook } from '../services/bookService';
import BookRating from '../components/books/BookRating';

interface BookDetails {
  _id?: string;
  externalId: string;
  title: string;
  authors: string[];
  publishedYear?: number;
  description?: string;
  coverImage?: string;
  category?: 'Read' | 'Currently Reading' | 'Want to Read';
  rating?: number;
  notes?: string;
}

const BookDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [book, setBook] = useState<BookDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [category, setCategory] = useState<'Read' | 'Currently Reading' | 'Want to Read'>('Want to Read');
  const [rating, setRating] = useState(0);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  useEffect(() => {
    const fetchBook = async () => {
      try {
        if (!id) return;
        
        setLoading(true);
        const bookData = await getBookDetails(id);
        setBook(bookData);
        
        if (bookData.notes) setNotes(bookData.notes);
        if (bookData.category) setCategory(bookData.category as any);
        if (bookData.rating) setRating(bookData.rating);
      } catch (err) {
        console.error('Error fetching book:', err);
        setError('Failed to load book details.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBook();
  }, [id]);
  
  const handleSave = async () => {
    if (!id || !book) return;
    
    try {
      setSaving(true);
      setError(null);
      
      await updateBook(id, {
        category,
        rating,
        notes
      });
      
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Error updating book:', err);
      setError('Failed to save book changes.');
    } finally {
      setSaving(false);
    }
  };
  
  const handleRemove = async () => {
    if (!id || !book) return;
    
    if (window.confirm(`Are you sure you want to remove "${book.title}" from your collection?`)) {
      try {
        await removeBook(id);
        navigate('/my-books');
      } catch (err) {
        console.error('Error removing book:', err);
        setError('Failed to remove book from collection.');
      }
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }
  
  if (error || !book) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-red-500" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error || 'Book not found'}</p>
            <button
              onClick={() => navigate(-1)}
              className="mt-2 text-red-700 hover:underline text-sm flex items-center"
            >
              <ChevronLeft size={16} className="mr-1" />
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  const categoryIcons = {
    'Read': <Check size={20} />,
    'Currently Reading': <Clock size={20} />,
    'Want to Read': <BookmarkIcon size={20} />
  };
  
  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-gray-600 hover:text-gray-900 flex items-center"
      >
        <ChevronLeft size={18} className="mr-1" />
        Back
      </button>
      
      {saveSuccess && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded">
          <p className="text-sm text-green-700">Book updated successfully!</p>
        </div>
      )}
      
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
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 p-6 flex justify-center">
            <div className="w-56 h-80 bg-gray-200 rounded-md overflow-hidden shadow-md">
              {book.coverImage ? (
                <img 
                  src={book.coverImage} 
                  alt={`Cover for ${book.title}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <BookOpen size={64} className="text-gray-400" />
                </div>
              )}
            </div>
          </div>
          
          <div className="md:w-2/3 p-6">
            <h1 className="text-3xl font-serif font-bold text-gray-800 mb-2">{book.title}</h1>
            
            <p className="text-gray-700 text-lg mb-1">
              {book.authors && book.authors.length > 0 
                ? book.authors.join(', ') 
                : 'Unknown author'}
            </p>
            
            {book.publishedYear && (
              <p className="text-gray-600 mb-4">Published: {book.publishedYear}</p>
            )}
            
            <div className="flex flex-wrap gap-4 items-center mb-6">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Reading Status
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 rounded-md"
                >
                  <option value="Want to Read">Want to Read</option>
                  <option value="Currently Reading">Currently Reading</option>
                  <option value="Read">Read</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Rating
                </label>
                <BookRating value={rating} onChange={setRating} size="lg" />
              </div>
            </div>
            
            {book.description && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-gray-700">{book.description}</p>
              </div>
            )}
            
            <div className="mb-6">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                Your Notes
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                placeholder="Add your personal notes about this book..."
              ></textarea>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleSave}
                disabled={saving}
                className={`bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors ${
                  saving ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              
              <button
                onClick={handleRemove}
                className="bg-white border border-red-500 text-red-500 px-4 py-2 rounded-md hover:bg-red-50 transition-colors flex items-center gap-1"
              >
                <Trash2 size={16} />
                <span>Remove from Collection</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;