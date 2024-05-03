import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../header";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/users/", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });

    if (res.ok) {
      const user = await res.json();
      console.log(user);
      navigate("/login");
    }
  };

  return (
    <>
      <Header />
      <div className="login-container">
        <h2 className="login-heading">Register</h2>
        <form
          onSubmit={handleSubmit}
          method="post"
          action="submit"
          id="registerForm"
        >
          <label>
            First Name:
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="typed-input"
            />
          </label>
          <br />
          <label>
            Last Name:
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="typed-input"
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="typed-input"
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="typed-input"
            />
          </label>
          <br />
          <button className="button-style " type="submit">
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
