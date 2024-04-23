const Itinerary = ({ itinerary }) => {
  // console.log("Itinerary Component:", itinerary.itinerary.itinerary);
  const dates = Object.keys(itinerary.itinerary)

  const mappedDisplayEntries = dates.map(date => {
    return (
      <div className="day-entry" key={date}>
        <h2 className='date'>{date}</h2>
        <div className="day-details">
        {times = Object.keys(date)}
        {/* each key/value pair inside the date object is a time and suggestion */}
        {times.map(time => (
          <div className='activity-details' key={time}>
            <h3 className="time-of-day">{time}</h3>
            <p>Activity: {time.suggestion.activity}</p>
            <p>Description: {time.suggestion.description}</p>
            <p>Address: {time.suggestion.address}</p>
          </div>
        ))}
        </div>
      </div>
    )
  });

  

// const example = {
//   date1: {
//     time1: {
//       suggestion1: {
//         activity: 'activity',
//         description: 'description',
//         address: 'address'
//       }
//     },
//     time2: {}
//   },
  
//   date2: {

//   }
// }


  if (itinerary) return (
    <div id='itinerary-details'>
      {dates.map(date => (
        <div className="day-entry" key={date}>
          <h2 className='date'>{date}</h2>
          <div className="day-details">
            {Object.keys(date).map(time => (
              <div className='activity-details' key={time}>
                <h3 className="time-of-day">{time}</h3>
                <p>Activity: {time.suggestion.activity}</p>
                <p>Description: {time.suggestion.description}</p>
                <p>Address: {time.suggestion.address}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Itinerary;
