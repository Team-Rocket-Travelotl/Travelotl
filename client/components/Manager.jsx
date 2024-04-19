import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { updateItinerary } from "../reducers/itineraryReducer";
import { Link } from 'react-router-dom';
import Header from "./Header";

const Manager = () => {
  const [itineraries, setItineraries] = useState([]);
  const dispatch = useDispatch();

  // Retrieve all itineraries associated with the user and update state
  useEffect(() => {
    try {
      const getItineraryList = async () => {
        let itineraryList = await fetch('api/trip/retrieve', {
          method: 'GET',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
            },
        });
  
        itineraryList = await itineraryList.json();
  
        console.log(itineraryList);
        setItineraries(itineraryList);
  
      }
      getItineraryList();   
    } catch (error) {
      console.error('Error with request:', error);
    }
    
  }, []);

  const deleteItinerary = async (e) => {
    const tripId = e.target.parentNode.parentNode.id;
    try {
      let remainingTrips = await fetch('api/trip/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
        },
        body: JSON.stringify({ tripId: tripId }),
      });

      remainingTrips = await remainingTrips.json();

      setItineraries(remainingTrips);

    } catch (err) {
      console.error('Error with request:', error);
    }
    
  }

  const seeDetails = async () => {
    const tripId = e.target.parentNode.parentNode.id;

    try {
      let itineraryList = await fetch('api/trip/retrieve', {
        method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
          },
      });

      itineraryList = await itineraryList.json();

      let foundTrip;
      for (const trip of itineraryList) {
        if (trip.tripId === tripId) {
          foundTrip = trip.trip;
          break;
        }
      }

      if (foundTrip) dispatch(updateItinerary(foundTrip));
      // Route to adam's itinerary page HEREEEEE
      
    } catch (error) {
      console.error('Error with request:', error);
    }
  };

  const itineraryList = [...itineraries];
  const renderList = itineraryList.map((itinerary) => {
    return (<div key={itinerary._id} id={itinerary._id}>
      <h4>{itinerary.destination}</h4>
      <p>From: <b>{itinerary.startDate}</b></p>
      <p>To: <b>{itinerary.endDate}</b></p>
      <div><button onClick={ seeDetails }>See Details</button>   <button onClick={ deleteItinerary }>Delete</button></div>
    </div>)
  })
  // state: { itinerary: { itinerary: itinerary.trip }}
  // to={{ pathname: '/other', state: dataToPass }}
  

  return (<div>
    <Header />
    <h2>Itinerary Manager</h2>
    {renderList}
  </div>)
}

export default Manager;