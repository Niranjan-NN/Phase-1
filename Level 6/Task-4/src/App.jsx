import React, { useState } from "react";
import './App.css';

const UserForm = () => {
 
  const [user, setUser] = useState({
    name: "",
    age: "",
    status: "Incomplete", 
  });

  
  const handleChange = (e) => {
    const { name, value } = e.target;

 
    const updatedUser = { ...user, [name]: value };

 
    updatedUser.status =
      updatedUser.name.trim() && updatedUser.age.trim() ? "Complete" : "Incomplete";

    setUser(updatedUser);
  };

  return (
    <div className="form-container">
      <h2 className="title">User Information</h2>

      
      <input
        type="text"
        name="name"
        placeholder="Enter your name"
        value={user.name}
        onChange={handleChange}
        className="input-box"
      />

    
      <input
        type="number"
        name="age"
        placeholder="Enter your age"
        value={user.age}
        onChange={handleChange}
        className="input-box"
      />

     
      <div className="user-card">
        <h3>Preview:</h3>
        <p><strong>Name:</strong> {user.name || "Not entered"}</p>
        <p><strong>Age:</strong> {user.age || "Not entered"}</p>
        <p className={`status ${user.status === "Complete" ? "complete" : "incomplete"}`}>
          <strong>Status:</strong> {user.status}
        </p>
      </div>
    </div>
  );
};

export default UserForm;
