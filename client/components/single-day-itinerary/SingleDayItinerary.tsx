import React, { useState } from "react";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";
import SingleDayItineraryProps from "../../models/SingleDayItineraryProps";
import CompleteItinerary from "../../models/CompleteItinerary";
import Map from "../map/Map";
const SingleDayItinerary = (props: SingleDayItineraryProps) => {
  const { editedItinerary, setEditedItinerary, dateObj, date } = props;
  const timeSlots = Object.keys(dateObj);
  const [addresses, setAddresses] = useState<string[]>([]);
  //=======> HANDLE CHANGE <============
  const handleChange = (
    date: string,
    timeOfDay: string,
    field: string,
    newText: string
  ) => {
    const ItineraryCopy: CompleteItinerary = JSON.parse(
      JSON.stringify(editedItinerary)
    );

    if (field === "address") {
      const newAddresses = [...addresses];
      newAddresses[timeSlots.indexOf(timeOfDay)] = newText;
      setAddresses(newAddresses);
    }

    console.log("time of day", ItineraryCopy[date][timeOfDay][field]);
    ItineraryCopy[date][timeOfDay][field] = newText;
    setEditedItinerary(ItineraryCopy);
    console.log("edit IT--->", editedItinerary);
  };

  const timeSlotComponents = timeSlots.map((timeOfDay) => {
    const { activity, description, address } = dateObj[timeOfDay];

    //=======> COMPONENT <============
    return (
      <div className="activity-details" key={timeOfDay}>
        <Map addresses={addresses} />
        <h3 className="time-of-day">{timeOfDay}</h3>
        <label htmlFor="Activity"> Activity:</label>
        <input
          type="text"
          name="activity"
          defaultValue={activity}
          onChange={(e) =>
            handleChange(date, timeOfDay, "activity", e.target.value)
          }
          id="activity"
        ></input>
        <label htmlFor="Description"> Description:</label>
        <input
          type="text"
          defaultValue={description}
          onChange={(e) =>
            handleChange(date, timeOfDay, "description", e.target.value)
          }
          id="Description"
        ></input>
        <label htmlFor="Address"> Address:</label>
        <input
          type="text"
          defaultValue={address}
          onChange={(e) =>
            handleChange(date, timeOfDay, "address", e.target.value)
          }
          id="Address"
        ></input>
      </div>
    );
  });

  return <div>{timeSlotComponents}</div>;
};

export default SingleDayItinerary;
