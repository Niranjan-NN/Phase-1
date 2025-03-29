import { useState, useEffect } from "react";

const User = (key, initialValue) => {
  const storedValue = localStorage.getItem(key);
  const [value, setValue] = useState(
    storedValue ? JSON.parse(storedValue) : initialValue
  );
  useEffect(() => {
    if (value !== undefined) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue]; 
};

export default User;
