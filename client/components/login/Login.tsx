import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../header";
import RegisteredUser from "../../models/RegisteredUser";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginWithGoogle: () => void = () =>
    (window.location.href = `${window.origin}/google-login/auth`);

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
        <button
          onClick={loginWithGoogle}
          type="submit"
          className="button-style "
          style={{
            fontFamily: "Lobster, sans-serif",
            fontSize: "50px",
            background: "rgb(233, 68, 123) ",
          }}
        >
          Login with Google
        </button>
        <p>or log in with email:</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-container">
            <label>Email:</label>
            <input
              style={{ background: "rgb(195, 219, 226, 0.5)" }}
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label>Password:</label>
            <input
              style={{ background: "rgb(195, 219, 226, 0.5)" }}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="button-style "
              style={{ fontSize: "10px" }}
            >
              Login
            </button>
            <button type="button" value="nav" onClick={handleClick}>
              {" "}
              sign up
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
