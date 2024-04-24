import { useSelector } from "react-redux";

import Header from "../header";
import Itinerary from "../itinerary/Itinerary"


const ItineraryDatesContainer = () => {
  const itinerary = useSelector(state => state.itinerary);
  const dates = Object.keys(itinerary.itinerary);

  const dateComponents = dates.map(date => {
    return (
      <div className="day-entry" key={date}>
        <h2 className='date'>{date}</h2>
        <div className="day-details">
          <ItineraryTimesContainer date={date}/>
        </div>
      </div>
    );
  });

  const itineraryItems = itinerary 
    ? (<div id='itinerary-details'>
        <h2>Your Itinerary</h2>
        {dateComponents}
      </div>)
    : null;

  return (
    <div>
      <Header />
      {itineraryItems}
    </div>
  );
};

export default ItineraryDatesContainer;