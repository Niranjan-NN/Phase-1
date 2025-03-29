import React from "react";
import { Link } from "react-router-dom";

const ThankYou = () => {
  return (
    <div className="container mt-5 text-center">
      <h1 className="text-success">Thank You!</h1>
      <p>Your message has been received. We will get back to you shortly.</p>

      {/* Button to return to Home */}
      <Link to="/" className="btn btn-primary mt-3">
        Back to Home
      </Link>
    </div>
  );
};

export default ThankYou;
