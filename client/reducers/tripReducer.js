import { createSlice } from '@reduxjs/toolkit';

let startDate = new Date(Date.now());
let endDate = new Date(Date.now());
endDate.setDate(startDate.getDate() + 3);

const initialState = {
  destination: 'Las Vegas, NV',
  startDate: startDate.toLocaleDateString(),
  endDate: endDate.toLocaleDateString(),
  activities: [],
  budget: 500,
  travelers: 1,
  groupDescription: 'Solo traveler',
  loading: false,
  error: null,
};

const tripSlice = createSlice({
  name: 'trip',
  initialState,
  reducers: {
    
  },
});

// export stuff

export default tripSlice.reducer;