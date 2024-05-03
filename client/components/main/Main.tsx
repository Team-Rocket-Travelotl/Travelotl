import React from "react";
import { Link } from "react-router-dom";
import Header from "../header";
import Map from "../map/Map";

const Main = () => {
  return (
    <div>
      <Header />
      <Map />
      <p>Let us plan the trip of your dreams...</p>
      <Link to="/form" id="start">
        Click here to get started...{" "}
      </Link>
    </div>
  );
};

export default Main;
