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
            <Link
              className="bg-blue-500/50 hover:bg-pink-300/50 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              to="/form"
              id="start"
            >
              Click here to get started...{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
