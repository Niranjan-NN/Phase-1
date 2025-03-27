import React from "react";
import PropTypes from "Prop-types"; 

const Details = ({ name, age, city }) => {
  return (
    <div>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
      <p>City: {city}</p>
    </div>
  );
};


Details.propTypes = {
  name: PropTypes.string.isRequired, 
  age: PropTypes.number.isRequired, 
  city: PropTypes.string.isRequired, 
};

export default Details;
