import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const items = [
  { id: 1, name: "Apple", category: "Fruit", price: 1 },
  { id: 2, name: "Carrot", category: "Vegetable", price: 0.5 },
  { id: 3, name: "Banana", category: "Fruit", price: 0.8 },
  { id: 4, name: "Broccoli", category: "Vegetable", price: 1.2 }
];

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get('query') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (category === '' || item.category === category)
  );

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ query: searchTerm, category });
  };

  return (
    <div className="container">
      <h1 className="title">🔍 Search Items</h1>
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Fruit">Fruit</option>
          <option value="Vegetable">Vegetable</option>
        </select>
        <button type="submit">Search</button>
      </form>

      <ul className="item-list">
        {filteredItems.map((item) => (
          <li key={item.id} className="item-card">{item.name} - ${item.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;
