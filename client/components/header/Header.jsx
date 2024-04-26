import { Link } from "react-router-dom";

const Header = () => {
  const userEmail = localStorage.getItem('userEmail');
  return (
    <div className="header-container">
      <div>
        <Link
          to="/"
          className="text-blue-600 text-3xl font-bold font-serif text-center"
        >
          Travelotl
        </Link>
      </div>
      <div className="text-right m-2">
        <Link to="/manager">Manager</Link>
      </div>
      <div className="text-right m-2">
        <Link to="/about">About</Link>
      </div>
      {userEmail ? (
        <div className="text-right m-2">
          Welcome, {userEmail} {/* Display user's email */}
        </div>
      ) : (
        <div>
          <div className="text-center m-2">
            <Link to="/register">Register</Link>
          </div>
          <div className="text-center m-2">
            <Link to="/login">Login</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
