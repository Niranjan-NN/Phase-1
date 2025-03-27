import React from "react";
import './App.css'

const CalculationComponent = () => {
  const num1 = 100;
  const num2 = 75;
  const sum = num1 + num2;

  return (
    <div>
      <h3 className="h3">Calculation </h3>
      <p className="p">The sum of {num1} and {num2} is: {sum}</p>
    </div>
  );
};

export default CalculationComponent;
