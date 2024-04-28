import Header from "../header/Header";
import { useNavigate } from "react-router-dom";

import React, { useEffect } from "react";

const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log("in front end log out");
    localStorage.removeItem("userEmail");
    navigate("/login");
  }, [navigate]);
  return null;
};

export default Logout;
