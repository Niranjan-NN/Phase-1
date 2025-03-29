import React, { useState } from "react";
import './App.css'

const ManageState = () => {
  const [user, setUser] = useState({ name: "", age: "" });

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <h2 className="title">Manage </h2>
      <div className="form">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          placeholder="Enter name"
        />

        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={user.age}
          onChange={handleChange}
          placeholder="Enter age"
        />

        <div className="output">
          <h3>Updated State:</h3>
          <p>Name: {user.name || "Not set"}</p>
          <p>Age: {user.age || "Not set"}</p>
        </div>
      </div>
    </div>
  );
};

export default ManageState;
