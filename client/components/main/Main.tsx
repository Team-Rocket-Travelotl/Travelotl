import React from "react";
import { Link } from "react-router-dom";
import Header from "../header";

const Main: React.FC = () => {
  return (
    <div>
      <Header />

      <div className="backgroundImage h-screen bg-no-repeat bg-center w-screen inset-0 grid grid-rows-3 ">
        <div className="flex flex-col justify-center">
          <h3 className="pb-4 pl-2 abosolute text-5xl">
            let's plan the trip of your dreams...
          </h3>
          <div className="inline-block">
            <Link className="button-style" to="/form">
              Click here to get started...
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
