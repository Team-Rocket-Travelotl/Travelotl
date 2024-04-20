const Itinerary = ({ itinerary }) => {
  // console.log("Itinerary Component:", itinerary.itinerary.itinerary);
  if (itinerary) return (
    <div>
      {Object.entries(itinerary.itinerary).map(([date, timesOfDay]) => (
        <div key={date}>
          <h2>{date}</h2>
          <div>
            {Object.entries(timesOfDay).map(([timeOfDay, suggestion]) => (
              <div key={timeOfDay}>
                <h3>{timeOfDay}</h3>
                <p>Activity: {suggestion.activity}</p>
                <p>Description: {suggestion.description}</p>
                <p>Address: {suggestion.address}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Itinerary;
