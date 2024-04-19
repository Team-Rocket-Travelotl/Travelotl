import { useState, useEffect } from "react";

const Manager = () => {
  const [itineraries, setItineraries] = useState([]);

  useEffect(() => {
    const getItineraryList = async () => {
      let itineraryList = await fetch('api/trip/retrieve', {
        method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
          },
      });

      itineraryList = await itineraryList.json();

      // console.log(await itineraryList.json());
      setItineraries(itineraryList);

    }
    
    getItineraryList();
        
  }, []);

  const itineraryList = [...itineraries];
  const renderList = itineraryList.map((itinerary) => {
    return (<div>
      <h4>{itinerary.destination}</h4>
      <p>From: <b>itinerary.startDate</b></p>
      <p>To: <b>itinerary.endDate</b></p>
    </div>)
  })
  

  return (<div>
    <h2>Itinerary Manager</h2>
    {renderList}
  </div>)
}

export default Manager;