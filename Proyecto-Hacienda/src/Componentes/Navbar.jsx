import React from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import "../styles//Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-icon">
        <Link to="/logeo">
          <FaUser className="icon" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

