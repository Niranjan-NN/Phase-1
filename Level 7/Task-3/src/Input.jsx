import { useState, useRef } from "react";

const Input = (initialValue = "") => {
  const [value, setValue] = useState(initialValue); 
  const inputRef = useRef(null);
  const onChange = (e) => {
    setValue(e.target.value); 
  };

  return {
    value,      
    onChange,    
    inputRef     
  };
};

export default Input;
