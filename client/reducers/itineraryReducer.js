import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  /* have properies that reflect the schema 
    itinerary:
    date : {
      morning : {
        activiteis: string
        description:
        address:
      }
      Afternoon: {}
      Evening : {}
    }
    
    */
  key: 'value',
};
const itinerarySlice = createSlice({
  name: 'itinerary',
  initialState,
  reducers: {
    updateItinerary(state, action) {
      // console.log('payload: ', action.payload);
      // state.itinerary = action.payload;
      return { ...state, itinerary: action.payload }
    },
    updateActivities(state, action) {
      console.log('inside update activities---->', initialState);
      state.map((day) => {
        console.log(day);
        if (day === action.payload.date) {
          day.map((time) => {
            if (time === action.payload.timeOfDay) {
              // update the activity
              return (time.activity = action.payload.field);
            }
          });
        }
        console.log(day);
      });
    },
    // action.payload = update info, and the date trigger the right time of day reducer
    // a reducer for each time of day
    // loop throught state to get the right day
    // user the reducer
  },
});

export const { actions, reducer } = itinerarySlice;
export const { updateItinerary, updateActivities } = actions;
export default reducer;
