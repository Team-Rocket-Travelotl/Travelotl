import { configureStore } from '@reduxjs/toolkit';
import tripReducer from './reducers/tripReducer.ts';
import itineraryReducer from './reducers/itineraryReducer.ts';

export const store = configureStore({ 
  reducer: {
    trip: tripReducer,
    itinerary: itineraryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;