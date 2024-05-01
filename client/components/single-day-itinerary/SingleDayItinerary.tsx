import React, { useState } from 'react';
import SingleDayItineraryProps from '../../models/SingleDayItineraryProps';
import CompleteItinerary from '../../models/CompleteItinerary';

const SingleDayItinerary = (props: SingleDayItineraryProps) => {
  const { editedItinerary, setEditedItinerary, dateObj, date } = props;
  const timeSlots = Object.keys(dateObj);
  const timeSlotComponents = timeSlots.map((timeOfDay) => {
    const { activity, description, address } = dateObj[timeOfDay];
    //=======> HANDLE CHANGE <============
    const handleChange = (
      date: string,
      timeOfDay: string,
      field: string,
      newText: string
    ) => {
      const ItineraryCopy = JSON.parse(JSON.stringify(editedItinerary));
      console.log('Itinerary Copy', ItineraryCopy);
      ItineraryCopy[date][timeOfDay][field] = newText;
      setEditedItinerary(ItineraryCopy);
      console.log('edit IT--->', editedItinerary);
      return editedItinerary;
    };

    //=======> COMPONENT <============
    return (
      <div className="activity-details" key={timeOfDay}>
        <h3 className="time-of-day">{timeOfDay}</h3>
        <label htmlFor=""> Activity:</label>
        <input
          type="text"
          defaultValue={activity}
          onChange={(e) =>
            handleChange(date, timeOfDay, 'activity', e.target.value)
          }
          id="activity"
        ></input>
        <label htmlFor=""> Description:</label>
        <input
          type="text"
          defaultValue={description}
          onChange={(e) =>
            handleChange(date, timeOfDay, 'description', e.target.value)
          }
          id="Description"
        ></input>
        <label htmlFor="Address"> Address:</label>
        <input
          type="text"
          defaultValue={address}
          onChange={(e) =>
            handleChange(date, timeOfDay, 'address', e.target.value)
          }
          id="Address"
        ></input>
      </div>
    );
  });

  return <div>{timeSlotComponents}</div>;
};

export default SingleDayItinerary;
