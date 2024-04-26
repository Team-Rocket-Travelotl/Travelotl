import React, { useState } from "react";

const SingleDayItinerary = ({ itinerary, dateObj, date }) => {
  const timeSlots = Object.keys(dateObj);
  const timeSlotComponents = timeSlots.map((timeOfDay) => {
    const { activity, description, address } = dateObj[timeOfDay];
    const [editedItinerary, setEditedItinerary] = useState({ itinerary });
    //=======> HANDLE CHANGE <============
    const handleChange = (date, timeOfDay, field, e) => {
      const ItineraryCopy = JSON.parse(JSON.stringify(editedItinerary));

      console.log(
        "time of day",
        ItineraryCopy.itinerary[date][timeOfDay][field]
      );
      ItineraryCopy.itinerary[date][timeOfDay][field] = e;
      setEditedItinerary(ItineraryCopy);
      console.log("edit IT--->", editedItinerary);
    };
    //=======> HANDLE CLICK <============
    const handleClick = async () => {
      console.log("state to send to back end", editedItinerary);
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
    //=======> COMPONENT <============
    return (
      <div className="activity-details" key={timeOfDay}>
        <h3 className="time-of-day">{timeOfDay}</h3>
        <label for=""> Activity:</label>
        <input
          type="text"
          defaultValue={activity}
          onChange={(e) =>
            handleChange(date, timeOfDay, "activity", e.target.value)
          }
          id="activity"
        ></input>
        <label for=""> Description:</label>
        <input
          type="text"
          defaultValue={description}
          onChange={(e) =>
            handleChange(date, timeOfDay, "description", e.target.value)
          }
          id="Description"
        ></input>
        <label for="Address"> Address:</label>
        <input
          type="text"
          defaultValue={address}
          onChange={(e) =>
            handleChange(date, timeOfDay, "address", e.target.value)
          }
          id="Address"
        ></input>
        <button onClick={handleClick}>save</button>
      </div>
    );
  });

  return <div>{timeSlotComponents}</div>;
};

export default SingleDayItinerary;
