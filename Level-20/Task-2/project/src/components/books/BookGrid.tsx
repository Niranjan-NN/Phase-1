import React from 'react';
import BookCard from './BookCard';

interface Book {
  _id?: string;
  externalId: string;
  title: string;
  authors: string[];
  publishedYear?: number;
  coverImage?: string;
  category?: string;
  rating?: number;
}

interface BookGridProps {
  books: Book[];
  showRating?: boolean;
  showCategory?: boolean;
  onAddToCollection?: (book: Book) => void;
}

const BookGrid: React.FC<BookGridProps> = ({ 
  books, 
  showRating = false,
  showCategory = false,
  onAddToCollection
}) => {
  if (!books || books.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No books found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {books.map((book) => (
        <BookCard
          key={book._id || book.externalId}
          book={book}
          showRating={showRating}
          showCategory={showCategory}
          onAddToCollection={onAddToCollection ? () => onAddToCollection(book) : undefined}
        />
      ))}
    </div>
  );
};

export default BookGrid;