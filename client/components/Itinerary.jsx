/*
GOAL: make the text feilds editable
/*
GOAL: make the text feilds editable
[x] import in react
[x] writie an on change function
[x] update each feild to be input boxes
[x] add a button to save
[x] write an onclick function to:
[x] save the new date to the database using a patch
[] style the input boxes
[] add a button to save
[] write an onclick function to:
[] save the new date to the database using a patch
[] style the input boxes
*/

import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { actions } from "../reducers/tripReducer";

const Itinerary = ({ itinerary }) => {
  const [editedItinerary, setEditedItinerary] = useState({});

  // const dispatch = useDispatch();

  const handleChange = (date, timeOfDay, field, e) => {
    console.log("arguments ===>", date, timeOfDay, field);

    const ItineraryCopy = JSON.parse(JSON.stringify(editedItinerary));

    ItineraryCopy[date];
    ItineraryCopy[date][timeOfDay] = {
      field,
      value: e,
    };
    console.log("copy===>", ItineraryCopy);
    setEditedItinerary(ItineraryCopy);
    console.log("edit IT--->", editedItinerary);
    // dispatch(actions.updateActivities(inputs));
  };

  const handleClick = async () => {
    try {
      const response = await fetch("/api/trip/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify(editedItinerary),
      });
      if (response.ok) {
        console.log("successful patch");
      } else {
        throw new Error("failed to retrieve data");
      }
    } catch (error) {
      console.error("Error with patch request:", error);
    }
  };

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
                  defaultValue={suggestion.activity}
                  onChange={(e) =>
                    handleChange(date, timeOfDay, "activites", e.target.value)
                  }
                  id="activity"
                ></input>
                <label for=""> Description:</label>
                <input
                  type="text"
                  defaultValue={suggestion.description}
                  onChange={(e) =>
                    handleChange(date, timeOfDay, "Description", e.target.value)
                  }
                  id="Description"
                ></input>
                {/* <p>Address: {suggestion.address}</p> */}
                <label for="Address"> Address:</label>
                <input
                  type="text"
                  defaultValue={suggestion.address}
                  onChange={(e) =>
                    handleChange(date, timeOfDay, "Address", e.target.value)
                  }
                  id="Address"
                ></input>
              </div>
            ))}
          </div>
          <button onClick={handleClick}>save</button>
        </div>
      ))}
    </div>
  );
};

export default Itinerary;
