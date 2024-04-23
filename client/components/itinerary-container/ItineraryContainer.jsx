import { useSelector } from "react-redux";

import Header from "../header";
import Itinerary from "../itinerary/Itinerary"


const ItineraryContainer = () => {
  const itinerary = useSelector(state => state.itinerary);
  return (
    <div>
      <Header />
      <h2>Your Itinerary</h2>
      <Itinerary itinerary={itinerary} />
    </div>
  );
};

export default ItineraryContainer;