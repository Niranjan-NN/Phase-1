import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          Delicious Eats
        </NavLink>
        <div className="navbar-nav">
          {/* Navigation links to different pages */}
          <NavLink className="nav-link" to="/">
            Home
          </NavLink>
          <NavLink className="nav-link" to="/category/Italian">
            Italian
          </NavLink>
          <NavLink className="nav-link" to="/category/American">
            American
          </NavLink>
          <NavLink className="nav-link" to="/category/Chinese">
            Chinese
          </NavLink>
          <NavLink className="nav-link" to="/category/Indian">
            Indian
          </NavLink>{" "}
          {/* New Indian food category */}
          <NavLink className="nav-link" to="/contact">
            Contact
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
