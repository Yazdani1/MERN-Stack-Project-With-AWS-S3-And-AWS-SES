import React, { useState, useContext } from "react";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar-main">
      <ul>
      
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <li className="nav-item">Home</li>
        </Link>
        <Link to={"/post"} style={{ textDecoration: "none" }}>
          <li className="nav-item">Post</li>
        </Link>
        <Link to={"/create-category"} style={{ textDecoration: "none" }}>
          <li className="nav-item">Create Category</li>
        </Link>


        <Link to={"/signup"} style={{ textDecoration: "none" }}>
          <li className="nav-item">Sign Up</li>
        </Link>

        <Link to={"/signin"} style={{ textDecoration: "none" }}>
          <li className="nav-item">Sign In</li>
        </Link>


        

      </ul>
    </nav>
  );
};

export default Navbar;
