import React, { useRef } from 'react';
import './InputSearch.css';

const InputSearch = () => {
  const inputRef = useRef(null);

  const SearchInput = () => {
    inputRef.current.search(); 
  };

  return (
    <div className="input-search-container">
      <h1> Focus Input</h1>

      <input
        ref={inputRef} 
        type="text"
        placeholder="Click the button to focus"
        className="input-field"
      />

      <button onClick={SearchInput} className="search-btn">
        Focus Input
      </button>
    </div>
  );
};

export default InputSearch;
