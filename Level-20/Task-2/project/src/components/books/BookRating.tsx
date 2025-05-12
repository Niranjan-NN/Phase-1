import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface BookRatingProps {
  value: number;
  onChange?: (rating: number) => void;
  size?: 'sm' | 'md' | 'lg';
  readOnly?: boolean;
}

const BookRating: React.FC<BookRatingProps> = ({ 
  value, 
  onChange, 
  size = 'md',
  readOnly = false
}) => {
  const [hoverRating, setHoverRating] = useState<number>(0);
  
  const starSizes = {
    sm: 16,
    md: 24,
    lg: 32
  };
  
  const starSize = starSizes[size];
  
  const handleClick = (rating: number) => {
    if (!readOnly && onChange) {
      onChange(rating);
    }
  };
  
  const handleMouseEnter = (rating: number) => {
    if (!readOnly) {
      setHoverRating(rating);
    }
  };
  
  const handleMouseLeave = () => {
    if (!readOnly) {
      setHoverRating(0);
    }
  };
  
  const currentRating = hoverRating || value;
  
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleClick(star)}
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={handleMouseLeave}
          disabled={readOnly}
          className={`p-0.5 focus:outline-none ${
            !readOnly ? 'cursor-pointer' : 'cursor-default'
          }`}
          aria-label={`Rate ${star} out of 5 stars`}
        >
          <Star
            size={starSize}
            className={`transition-colors duration-150 ${
              star <= currentRating
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300'
            }`}
          />
        </button>
      ))}
    </div>
  );
};

export default BookRating;