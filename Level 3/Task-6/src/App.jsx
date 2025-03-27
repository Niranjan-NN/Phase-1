import React, { useState } from "react";
import './App.css'

const items = [
  { id: 1, name: "Apple", category: "Fruit" },
  { id: 2, name: "Banana", category: "Fruit" },
  { id: 3, name: "Carrot", category: "Vegetable" },
  { id: 4, name: "Tomato", category: "Vegetable" },
  { id: 5, name: "Orange", category: "Fruit" },
  { id: 6, name: "Cucumber", category: "Vegetable" },
];

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  

  // Filter logic
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === "All" || item.category === category;
    return matchesSearch && matchesCategory;
  });

  console.log("Filtered Items:", filteredItems);

  return (
    <div>
      <h1>Search Here...</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Category Filter */}
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="All">All</option>
        <option value="Fruit">Fruit</option>
        <option value="Vegetable">Vegetable</option>
      </select>

      {/* Display Filtered List */}
      <ul>
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => <li key={item.id}>{item.name} ({item.category})</li>)
        ) : (
          <li>No results found</li>
        )}
      </ul>
    </div>
  );
};

export default App;
