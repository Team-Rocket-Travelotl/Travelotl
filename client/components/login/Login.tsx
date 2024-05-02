import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../header";
import { RegisteredUser } from '../../models/RegisteredUser';

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

  return (
    <div>
      <Header />
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      <button onClick={loginWithGoogle}>Login With Google</button>
    </div>
  );
};

export default Login;
