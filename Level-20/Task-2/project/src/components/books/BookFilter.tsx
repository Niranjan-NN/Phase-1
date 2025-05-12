import React from 'react';
import { Filter, SortAsc, SortDesc } from 'lucide-react';

interface BookFilterProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  sortOption: string;
  setSortOption: (option: string) => void;
}

const BookFilter: React.FC<BookFilterProps> = ({
  selectedCategory,
  setSelectedCategory,
  sortOption,
  setSortOption
}) => {
  return (
    <div className="mb-8 bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <Filter size={18} />
        <span>Filter & Sort</span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <div className="flex flex-wrap gap-2">
            {['All', 'Read', 'Currently Reading', 'Want to Read'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                  selectedCategory === category
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
          <div className="flex flex-wrap gap-2">
            {[
              { value: 'dateAdded:desc', label: 'Recently Added', icon: <SortDesc size={14} /> },
              { value: 'dateAdded:asc', label: 'Oldest Added', icon: <SortAsc size={14} /> },
              { value: 'rating:desc', label: 'Highest Rated', icon: <SortDesc size={14} /> },
              { value: 'title:asc', label: 'Title A-Z', icon: <SortAsc size={14} /> }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setSortOption(option.value)}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors flex items-center gap-1 ${
                  sortOption === option.value
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {option.icon}
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookFilter;