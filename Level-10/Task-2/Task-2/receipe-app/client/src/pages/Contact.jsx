import React from "react";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/thankyou"); // Redirect to Thank You page after submission
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Contact Us</h1>
      <p className="text-center">
        Have any questions? Fill out the form below, and we'll get back to you.
      </p>

      {/* Contact Form */}
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Message</label>
          <textarea className="form-control" rows="4" required></textarea>
        </div>
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
