import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import UserTripOptions from '../models/UserTripOptions';

const today = new Date(Date.now());

const initialState = {
  destination: '',
  startDate: today.toISOString().slice(0, 10),
  endDate: today.toISOString().slice(0, 10),
  activities: [],
  budget: 0,
  travelers: 0,
  groupDescription: 'Solo traveler',
} as UserTripOptions;

const tripSlice = createSlice({
  name: 'trip',
  initialState,
  reducers: {
    updateDestination(state, action: PayloadAction<string>) {
      state.destination = action.payload;
    },
    updateStartDate(state, action: PayloadAction<string>) {
      state.startDate = action.payload;
    },
    updateEndDate(state, action: PayloadAction<string>) {
      state.endDate = action.payload;
    },
    updateActivities(state, action: PayloadAction<String[]>) {
      state.activities = action.payload;
    },
    updateBudget(state, action: PayloadAction<number>) {
      state.budget = action.payload;
    },
    updateTravelers(state, action: PayloadAction<number>) {
      state.travelers = action.payload;
    },
    updateGroupDescription(state, action: PayloadAction<string>) {
      state.groupDescription = action.payload;
    },
  },
});

export const { actions, reducer } = tripSlice;
export const { updateDestination, updateStartDate, updateEndDate, updateActivities, updateBudget, updateTravelers, updateGroupDescription } = actions;
export default reducer;