import React, { useState } from "react";
import '../formSubmit.css';  // Ensure the filename matches exactly

const API_URL = "https://jsonplaceholder.typicode.com/posts";

const FormSubmit = () => {
  const [formData, setFormData] = useState({ title: "", body: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to submit form");

      const result = await response.json();
      setMessage("Form submitted successfully!");
      console.result("result", result);
    } catch (error) {
      setMessage("Submission failed.");
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>Submit Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <textarea
          placeholder="Body"
          value={formData.body}
          onChange={(e) => setFormData({ ...formData, body: e.target.value })}
        />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default FormSubmit;
