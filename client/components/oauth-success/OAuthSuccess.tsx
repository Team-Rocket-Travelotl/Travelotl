import React from "react";
import Header from "../header";
import { useNavigate } from "react-router-dom";

const OAuthSuccess = () => {
  const navigate = useNavigate();

  localStorage.setItem('userEmail', 'Google User');
  setTimeout(() => navigate('/'), 1000);

  return (
    <div>
      <Header />
      <p>Login successful! Redirecting you to the main page now...</p>
    </div>
  );
}

export default OAuthSuccess;