import React from "react";
import './App.css'

const Greetings = ({ name }) => {
  return <h2 className="h2">Hello, {name}!</h2>;
};


Greetings.defaultProps = {
  name: "World",
};

export default Greetings;
