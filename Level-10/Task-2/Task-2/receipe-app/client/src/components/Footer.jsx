import React from "react";

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white text-center py-3">
      <p>
        &copy; {new Date().getFullYear()} Delicious Eats. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
