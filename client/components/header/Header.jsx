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
      <div className="grid grid-cols-2 gap-1 place-content-around">
        <>
          <Link to="/manager">Manager</Link>
          <Link to="/about">About</Link>
        </>
        {userEmail ? (
          <>
            <p>Welcome,</p>
            <p>{userEmail}</p>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
