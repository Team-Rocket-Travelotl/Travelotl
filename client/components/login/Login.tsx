import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../header";
import RegisteredUser from '../../models/RegisteredUser';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginWithGoogle: () => void = () => window.location.href = `${window.origin}/google-login/auth`;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/users/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const user: RegisteredUser = await res.json();
      localStorage.setItem("userToken", user.token);
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userId", user._id);
      navigate("/");
    }
  };

  const handleClick = () => {
    navigate("/register");
  };

  return (
    <>
      <Header />
      <div className="login-container">
        <h1 className="login-heading">Login</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-container">
            <label>Email:</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="typed-input"
            />
          </div>
          <div className="input-container">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="typed-input"
            />
          </div>
          <button type="submit" className="button-style ">
            Login
          </button>
          <button
            type="button"
            className="button-style "
            value="nav"
            onClick={handleClick}
          >
            {" "}
            sign up
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
