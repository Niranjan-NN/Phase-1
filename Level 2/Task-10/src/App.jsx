import React, { useState } from "react";
import './App.css';

const FormSubmission = () => {
  const [text, setText] = useState("");
  const [submittedText, setSubmittedText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedText(text);
    console.log("Form submitted with input:", text);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input className="input"
          type="text"
          placeholder="Type something..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </form>
      {submittedText && <p className="p">You typed: {submittedText}</p>}
    </div>
  );
};

export default FormSubmission;