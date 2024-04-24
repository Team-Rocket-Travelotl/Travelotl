import React from 'react';

const ItineraryTimesContainer = ({ date }) => {
  const times = Object.keys(date);
  const timeSlotComponents = times.map(time => {
    const { activity, description, address } = time.suggestion;
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

export default ItineraryTimesContainer;