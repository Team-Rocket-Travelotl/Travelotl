import { useSelector } from "react-redux";

import Header from "./Header";
import Itinerary from "./Itinerary"


const ItineraryPage = () => {
  const itinerary = useSelector(state => state.itinerary);
  return (
    <div>
      <Header />
      <h2>Your Itinerary</h2>
      <Itinerary itinerary={itinerary} />
    </div>
  );
};

export default ItineraryPage;