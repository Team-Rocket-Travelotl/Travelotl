/*
GOAL: make the text feilds editable
[x] import in react
[] import in the state we will edit
[x] writie an on change function
[x] update each feild to be input boxes
[] add a button to save
[] write an onclick function to:
[] save the new date to the database using a patch
[] style the input boxes
*/

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../reducers/tripReducer";

const Itinerary = ({ itinerary }) => {
  const [editedItinerary, setEditedItinerary] = useState({});
  console.log("original state ===>", editedItinerary);

  console.log("do we have update activities", actions.updateActivities);
  const { activities } = useSelector((state) => state.trip);

  const dispatch = useDispatch();

  const handleChange = (date, timeOfDay, field, e) => {
    console.log("arguments ===>", date, timeOfDay, field);
    const inputs = {
      date,
      timeOfDay,
      field,
      value: e,
    };
    const ItineraryCopy = JSON.parse(JSON.stringify(editedItinerary));
    ItineraryCopy[date] = date;
    ItineraryCopy[timeOfDay] = timeOfDay;
    ItineraryCopy[field] = field;
    ItineraryCopy.value = e;
    console.log("copy===>", ItineraryCopy);
    // { ...editedItinerary, [date]: {...editedItinerary[date], [timeOfDay]: {...editedItinerary[field]: value}} }; // => {}
    setEditedItinerary(ItineraryCopy); // => {inputs{data}}
    console.log("edit IT--->", editedItinerary);
    // dispatch(actions.updateActivities(inputs));
  };

  // const handleClick{
  // send a patch
  // }
  // date, timeOfDay, field, value
  if (itinerary) console.log("if null, log in ====> ", itinerary.itinerary);
  return (
    <div id="itinerary-details">
      {Object.entries(itinerary.itinerary).map(([date, timesOfDay]) => (
        <div className="day-entry" key={date}>
          <h2 className="date">{date}</h2>
          <div className="day-details">
            {Object.entries(timesOfDay).map(([timeOfDay, suggestion]) => (
              <div className="activity-details" key={timeOfDay}>
                <h3 className="time-of-day">{timeOfDay}</h3>
                {/* <p>Activity: {suggestion.activity}</p> */}
                <label for=""> Activity:</label>
                <input
                  type="text"
                  defaultValue={
                    suggestion.activity
                    // editedItinerary?.[date]?.[timeOfDay]?.activity ||
                    // suggestion.activity
                  }
                  onChange={
                    // handleChange
                    // (e) =>
                    (e) =>
                      handleChange(date, timeOfDay, "activites", e.target.value)
                  }
                  id="activity"
                ></input>

                <p>Description: {suggestion.description}</p>
                <p>Address: {suggestion.address}</p>
              </div>
            ))}
          </div>
          {/* <button onClick={handleClick}>save</button> */}
        </div>
      ))}
    </div>
  );
};

export default Itinerary;
