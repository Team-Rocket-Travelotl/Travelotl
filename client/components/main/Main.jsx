import Header from "../header/Header";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div>
      <Header />
      <img
        className="w-screen bg-cover bg-no-repeat"
        src="../../assets/planTrip.png"
        alt="background"
      ></img>
      <div className="absolute inset-0 grid grid-rows-3 ">
        <div className="flex flex-col justify-center">
          <h3 className="pb-4 abosolute text-5xl">
            let us plan the trip of your dreams...
          </h3>
          <div className="inline-block">
            <Link className="button-style" to="/form">
              Click here to get started...{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
