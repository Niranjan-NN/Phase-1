import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = 'Search for books...' 
}) => {
  const [query, setQuery] = useState('');
  const timeoutRef = useRef<number | null>(null);

  // Clean up timeout when component unmounts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    // Debounce search
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = window.setTimeout(() => {
      if (value.trim().length >= 2) {
        onSearch(value);
      }
    }, 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim().length >= 2) {
      onSearch(query);
    }
  };

  const clearSearch = () => {
    setQuery('');
    // Don't trigger search after clearing
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
        
        <input
          type="search"
          value={query}
          onChange={handleChange}
          className="block w-full p-4 pl-10 pr-12 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-sm text-gray-900"
          placeholder={placeholder}
          aria-label="Search books"
        />
        
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-14 top-1/2 transform -translate-y-1/2 p-1 bg-gray-100 rounded-full hover:bg-gray-200"
            aria-label="Clear search"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        )}
        
        <button
          type="submit"
          className="absolute right-2.5 top-1/2 transform -translate-y-1/2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg text-sm px-3 py-2 transition-colors"
          aria-label="Submit search"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;