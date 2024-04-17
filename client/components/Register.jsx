import Header from "./Header";

import React, { useState } from 'react';

const Register = ({ handleRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch ('/register', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password}),
    })
    if(res.ok){
        const user = res.json()
        console.log("Test!!!")
    }
  };

  return (
    <div>
        <Header />
      <h2>Register</h2>
      <form onSubmit={handleSubmit} method='post' action='submit' id='registerForm'>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;