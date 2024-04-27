import React from 'react';
import { useSelector } from "react-redux";
import Header from "../header";
import SingleDayItinerary from '../single-day-itinerary';

const CompleteItinerary = () => {
  const { itinerary } = useSelector(state => state.itinerary);

  let dates;
  let dateComponents;

  if (itinerary) {
    dates = Object.keys(itinerary)

    dateComponents = dates.map(date => {
      return (
        <div className="day-entry" key={date}>
          <h2 className='date'>{date}</h2>
          <div className="day-details">
            <SingleDayItinerary dateObj={itinerary[date]}/>
          </div>
        </div>
      );
    });
  }

  const itineraryItems = itinerary 
    ? (<div id='itinerary-details'>
        <h2>Your Itinerary</h2>
        {dateComponents}
      </div>)
    : null;

  return (
    <div>
      <Header />
      {itineraryItems}
    </div>
  );
};

export default CompleteItinerary;