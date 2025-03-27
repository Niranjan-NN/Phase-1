import React from "react";
import './App.css';

const Details = ({ name, age, city }) => {
  return (
    <div>
      <h3 className="h3"> Details </h3>
      <div className='p'>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
      <p>City: {city}</p>
      </div>
    </div>
  );
};

export default Details;
