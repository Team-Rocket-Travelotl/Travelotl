import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <>
      <nav className="menu-nav">
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/about">About </Link>
        <Link to="/myitinerary">My Itinerary </Link>
        <Link to="/manager">Manager </Link>
      </nav>
    </>
  );
};

export default Menu;
