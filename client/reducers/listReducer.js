import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    // updateItinerary(state, action) {
    //   state.itinerary = action.payload;
    // },
    deleteTrip(state, action) {
      state.push(action.payload);
    },
  },
});

export const { actions, reducer } = listSlice;
export const { deleteTrip } = actions;
export default reducer;
