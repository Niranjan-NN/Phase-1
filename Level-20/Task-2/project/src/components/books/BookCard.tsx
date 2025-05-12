import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Star } from 'lucide-react';

interface BookCardProps {
  book: {
    _id?: string;
    externalId: string;
    title: string;
    authors: string[];
    publishedYear?: number;
    coverImage?: string;
    category?: string;
    rating?: number;
  };
  showRating?: boolean;
  showCategory?: boolean;
  onAddToCollection?: () => void;
}

const BookCard: React.FC<BookCardProps> = ({ 
  book, 
  showRating = false,
  showCategory = false,
  onAddToCollection
}) => {
  const {
    _id,
    externalId,
    title,
    authors,
    publishedYear,
    coverImage,
    category,
    rating = 0
  } = book;

  const renderRatingStars = () => {
    return (
      <div className="flex items-center mt-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={`${
              i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const getCategoryColor = () => {
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
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-56 bg-gray-200">
        {coverImage ? (
          <img
            src={coverImage}
            alt={`Cover for ${title}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-100">
            <Book size={48} className="text-gray-400" />
          </div>
        )}
        
        {showCategory && category && (
          <div className={`absolute top-2 right-2 ${getCategoryColor()} text-white text-xs px-2 py-1 rounded-full`}>
            {category}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <Link 
          to={_id ? `/book/${_id}` : `/search/details/${externalId}`}
          className="font-serif font-bold text-lg text-gray-800 hover:text-teal-700 transition-colors line-clamp-2 min-h-[4rem]"
        >
          {title}
        </Link>
        
        <p className="text-gray-600 text-sm mt-1 line-clamp-1">
          {authors && authors.length > 0 ? authors.join(', ') : 'Unknown author'}
        </p>
        
        {publishedYear && (
          <p className="text-gray-500 text-xs mt-1">{publishedYear}</p>
        )}
        
        {showRating && renderRatingStars()}
        
        {onAddToCollection && (
          <button
            onClick={onAddToCollection}
            className="mt-3 w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-md transition-colors duration-200 flex items-center justify-center gap-1"
          >
            <span>Add to Collection</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default BookCard;