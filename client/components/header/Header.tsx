import React from "react";
import { Link } from "react-router-dom";
import Menu from "../menu";

const Header = () => {
  const userEmail = localStorage.getItem("userEmail");
  const handleClick = () => {
    const menuNav = document.querySelector(".menu-nav");
    if (menuNav) menuNav.classList.toggle("is-active");
  };
  return (
    <div className="header-container">
      <div>
        <Link to="/" className="main-heading">
          Travelotl
        </Link>
      </div>

      {/* ============ NAV MENU ============ */}
      <div className="welcome">
        {userEmail ? (
          <div>
            <p>Welcome, {userEmail}</p>
            <nav className="menu-nav">
              <Link to="/myitinerary">My Itinerary </Link>
              <Link to="/manager">Manager </Link>
              <Link to="/logout">Logout</Link>
            </nav>
          </div>
        ) : (
          <nav className="menu-nav">
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
            <Link to="/myitinerary">My Itinerary </Link>
            <Link to="/manager">Manager </Link>
          </nav>
        )}
        <button className="hamburger" onClick={handleClick}>
          <div className="bar"></div>
        </button>
      </div>
    </div>
  );
};

export default Header;
