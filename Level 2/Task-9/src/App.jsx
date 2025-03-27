import React, { useState } from "react";
import './App.css';

const InputField = () => {
  const [text, setText] = useState("");

  return (
    <div>
      <input className="input"
        type="Hi I am Pradeep"
        placeholder="Type something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <p className="p">You typed: {text}</p>
    </div>
  );
};

export default InputField;
