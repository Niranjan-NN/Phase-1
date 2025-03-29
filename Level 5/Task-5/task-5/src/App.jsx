import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [input, setInput] = useState("0");
  const [operator, setOperator] = useState(null);
  const [previousInput, setPreviousInput] = useState("");
  const [result, setResult] = useState(null);
  const [isOperatorClicked, setIsOperatorClicked] = useState(false);

  const handleNumberClick = (num) => {
    if (isOperatorClicked) {
      setInput(num);
      setIsOperatorClicked(false);
    } else {
      setInput((prev) => (prev === "0" ? num : prev + num));
    }
  };

  const handleOperatorClick = (op) => {
    if (input === "") return;

    if (previousInput !== "" && operator) {
      calculateResult();
    } else {
      setPreviousInput(input);
    }

    setOperator(op);
    setIsOperatorClicked(true);
  };

  const calculateResult = () => {
    if (input === "" || previousInput === "" || !operator) return;

    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(input);
    let newResult;

    switch (operator) {
      case "+":
        newResult = num1 + num2;
        break;
      case "-":
        newResult = num1 - num2;
        break;
      case "*":
        newResult = num1 * num2;
        break;
      case "/":
        newResult = num2 !== 0 ? num1 / num2 : "Error";
        break;
      default:
        return;
    }

    setResult(newResult);
    setInput(newResult.toString());
    setPreviousInput("");
    setOperator(null);
    setIsOperatorClicked(false);
  };

  const clearCalculator = () => {
    setInput("0");
    setPreviousInput("");
    setOperator(null);
    setResult(null);
    setIsOperatorClicked(false);
  };

  return (
    <div className="calculator">
      <div className="display">{input !== "" ? input : result !== null ? result : "0"}</div>
      <div className="buttons">
        {["7", "8", "9", "/"].map((btn) => (
          <button key={btn} onClick={() => (isNaN(btn) ? handleOperatorClick(btn) : handleNumberClick(btn))}>
            {btn}
          </button>
        ))}
        {["4", "5", "6", "*"].map((btn) => (
          <button key={btn} onClick={() => (isNaN(btn) ? handleOperatorClick(btn) : handleNumberClick(btn))}>
            {btn}
          </button>
        ))}
        {["1", "2", "3", "-"].map((btn) => (
          <button key={btn} onClick={() => (isNaN(btn) ? handleOperatorClick(btn) : handleNumberClick(btn))}>
            {btn}
          </button>
        ))}
        {["0", "C", "=", "+"].map((btn) => (
          <button
            key={btn}
            onClick={() => {
              if (btn === "C") clearCalculator();
              else if (btn === "=") calculateResult();
              else if (isNaN(btn)) handleOperatorClick(btn);
              else handleNumberClick(btn);
            }}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;