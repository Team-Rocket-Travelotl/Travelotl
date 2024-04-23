import { configureStore } from "@reduxjs/toolkit";
import tripReducer from './reducers/tripReducer';
import itineraryReducer from './reducers/itineraryReducer';

export default store = configureStore({ 
  reducer: {
    trip: tripReducer,
    itinerary: itineraryReducer,
  }
});