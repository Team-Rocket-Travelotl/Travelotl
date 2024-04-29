import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import CompleteItinerary from '../models/CompleteItinerary';

const initialState = {itinerary: {} as CompleteItinerary, id: ''};

const itinerarySlice = createSlice({
  name: 'itinerary',
  initialState,
  reducers: {
    updateItineraryAndId(state, action: PayloadAction<{itinerary: CompleteItinerary, id: string}>) {
      const { itinerary, id } = action.payload;
      state.itinerary = itinerary;
      state.id = id;
    },
  },
});

export const { actions, reducer } = itinerarySlice;
export const { updateItineraryAndId } = actions;
export default reducer;
