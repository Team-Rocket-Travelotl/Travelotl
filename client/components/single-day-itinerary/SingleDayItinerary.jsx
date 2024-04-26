import React from 'react';

const SingleDayItinerary = ({ dateObj }) => {
  const timeSlots = Object.keys(dateObj);
  const timeSlotComponents = timeSlots.map(time => {
    const { activity, description, address } = dateObj[time];
    return (
      <div className='activity-details' key={time}>
        <h3 className="time-of-day">{time}</h3>
          <p>Activity: {activity}</p>
          <p>Description: {description}</p>
          <p>Address: {address}</p>
      </div>
    );
  });

  return <div>{timeSlotComponents}</div>
};

export default SingleDayItinerary;