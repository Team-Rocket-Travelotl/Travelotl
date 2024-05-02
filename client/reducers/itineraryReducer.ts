import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import CompleteItinerary from '../models/CompleteItinerary';

const initialState = {itinerary: {} as CompleteItinerary, id: '', userEmail: ''};

const itinerarySlice = createSlice({
  name: 'itinerary',
  initialState,
  reducers: {
    setCurrentItineraryDetails(state, action: PayloadAction<{itinerary: CompleteItinerary, id: string, userEmail: string}>) {
      state = Object.assign(state, action.payload);
    },
  },
});

export const { actions, reducer } = itinerarySlice;
export const { setCurrentItineraryDetails } = actions;
export default reducer;
