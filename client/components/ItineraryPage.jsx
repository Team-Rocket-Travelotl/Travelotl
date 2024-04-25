import { useSelector } from 'react-redux';

import Header from './Header';
import Itinerary from './Itinerary';

const ItineraryPage = () => {
  // this state is set on page 6 after the fetch from the back end
  const itinerary = useSelector((state) => state.itinerary);
  return (
    <div>
      <Header />
      <h2>Your Itinerary</h2>
      <Itinerary itinerary={itinerary} />
    </div>
  );
};

export default ItineraryPage;
