import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const userEmail = localStorage.getItem("userEmail");
  return (
    <div className="header-container">
      <div>
        <Link
          to="/"
          className="font-family: lobster-regular pl-4 pt-2 text-blue-600 text-6xl font-bold font-serif text-center"
        >
          Travelotl
        </Link>
      </div>
      <div className="grid grid-cols-1 pr-4 gap-1 place-content-around">
        {userEmail ? (
          <>
            <p>Welcome, {userEmail}</p>
            <Link to="/logout">Log out</Link>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
        <div>
          <Link className="heading-link" to="/manager">
            Manager
          </Link>
          <Link className="pr-2 pl-2" to="/about">
            About
          </Link>
          <Link className="pr-2 pl-2" to="/myitinerary">
            My Itinerary
          </Link>
        </div>
        {/* <>
          <Link to="/manager">Manager</Link>
          <Link to="/myitinerary">My Itinerary</Link>
          <Link to="/about">About</Link>
        </>
        {userEmail ? (
          <>
            <Link to="/logout">Log out</Link>
            <p>Welcome,</p>
            <p>{userEmail}</p>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )} */}
      </div>
    </div>
  );
};

export default Header;
