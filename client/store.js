import { configureStore } from '@reduxjs/toolkit';
import tripReducer from './reducers/tripReducer';
import itineraryReducer from './reducers/itineraryReducer';

export default configureStore({ 
  reducer: {
    trip: tripReducer,
    itinerary: itineraryReducer,
  },
});