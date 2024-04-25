import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const itinerarySlice = createSlice({
  name: 'itinerary',
  initialState,
  reducers: {
    updateItinerary(state, action) {
      // console.log('payload: ', action.payload);
      // state.itinerary = action.payload;
      return { ...state, itinerary: action.payload }
    },
  },
});

export const { actions, reducer } = itinerarySlice;
export const { updateItinerary } = actions;
export default reducer;