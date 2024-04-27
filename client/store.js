import { configureStore } from '@reduxjs/toolkit';
import tripReducer from './reducers/tripReducer.ts';
import itineraryReducer from './reducers/itineraryReducer.ts';

export default configureStore({ 
  reducer: {
    trip: tripReducer,
    itinerary: itineraryReducer,
  },
});