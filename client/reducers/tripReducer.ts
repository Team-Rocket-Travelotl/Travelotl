import { createSlice } from '@reduxjs/toolkit';

const today = new Date(Date.now());

const initialState = {
  destination: '',
  startDate: today.toISOString().slice(0, 10),
  endDate: today.toISOString().slice(0, 10),
  activities: [],
  budget: '',
  travelers: '',
  groupDescription: 'Solo traveler',
};

const tripSlice = createSlice({
  name: 'trip',
  initialState,
  reducers: {
    updateDestination(state, action) {
      // return { ...state, destination: action.payload }
      state.destination = action.payload;
      // return state;
    },
    updateStartDate(state, action) {
      state.startDate = action.payload;
    },
    updateEndDate(state, action) {
      state.endDate = action.payload;
    },
    updateActivities(state, action) {
      state.activities = action.payload;
    },
    updateBudget(state, action) {
      state.budget = action.payload;
    },
    updateTravelers(state, action) {
      state.travelers = action.payload;
    },
    updateGroupDescription(state, action) {
      state.groupDescription = action.payload;
    },
  },
});

export const { actions, reducer } = tripSlice;
export const { updateDestination, updateStartDate, updateEndDate, updateActivities, updateBudget, updateTravelers, updateGroupDescription } = actions;
export default reducer;