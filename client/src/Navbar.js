import React, { useState, useContext } from "react";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "./UserContext";

const Navbar = () => {
  const [state, setState] = useContext(UserContext);

  return (
    <nav className="navbar-main">
      {state && state.token && state.token ? (
        <ul>
          <li>{state && state.user && state.user.name}</li>

          <Link to={"/"} style={{ textDecoration: "none" }}>
            <li className="nav-item">Home</li>
          </Link>
          <Link to={"/post"} style={{ textDecoration: "none" }}>
            <li className="nav-item">Post</li>
          </Link>
          <Link to={"/create-category"} style={{ textDecoration: "none" }}>
            <li className="nav-item">Create Category</li>
          </Link>

          <Link to={"/signout"} style={{ textDecoration: "none" }}>
            <li className="nav-item">Sign Out</li>
          </Link>

       
        </ul>
      ) : (
        <ul>

          <Link to={"/"} style={{ textDecoration: "none" }}>
            <li className="nav-item">Home</li>
          </Link>
      
          <Link to={"/signup"} style={{ textDecoration: "none" }}>
            <li className="nav-item">Sign Up</li>
          </Link>

          <Link to={"/signin"} style={{ textDecoration: "none" }}>
            <li className="nav-item">Sign In</li>
          </Link>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
