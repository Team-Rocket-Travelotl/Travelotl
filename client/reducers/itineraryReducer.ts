import { createSlice } from '@reduxjs/toolkit';
import Itinerary from '../models/Itinerary';

const initialState = {itinerary: {}, id: ''}

const itinerarySlice = createSlice({
  name: 'itinerary',
  initialState,
  reducers: {
    updateItineraryAndId(state, action) {
      const { itinerary, id } = action.payload;
      state.itinerary = itinerary;
      state.id = id;
    },
  },
});

export const { actions, reducer } = itinerarySlice;
export const { updateItineraryAndId } = actions;
export default reducer;
