import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "./Header";
import Itinerary from "./Itinerary"

import { updateItinerary } from "../reducers/itineraryReducer";

const ItineraryPage = () => {
  const formData = useSelector(state => state.trip);
  const itinerary = useSelector(state => state.itinerary);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        console.log('data sent to back end server to make API request');
        const response = await fetch('/api/trip', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        const parsedData = await response.json();
        if (response.ok) {
          dispatch(updateItinerary(parsedData.itinerary));
        } else {
          throw new Error('failed to retrieve data');
        }
      } catch (error) {
        console.error('Error with request:', error);
      }
    }
    fetchItinerary();
  }, [])
  
  return (
    <div>
      <Header />
      <h2>Your Itinerary</h2>
      <Itinerary itinerary={itinerary} />
    </div>
  );
};

export default ItineraryPage;