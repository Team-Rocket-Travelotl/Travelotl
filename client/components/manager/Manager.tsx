import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import TripDetails from "../../models/TripDetails.ts";
import { updateItineraryAndId } from "../../reducers/itineraryReducer.ts";
import Header from "../header";
import CompleteItinerary from "../../models/CompleteItinerary.ts";

const Manager = () => {
  const [itineraries, setItineraries] = useState<TripDetails[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Retrieve all itineraries associated with the user and update state
  // useEffect is to prevent infinite re-renders when state is updated
  useEffect(() => {
    try {
      (async function() {
        const response = await fetch("api/trip/retrieve", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        });
        const itineraryList: TripDetails[] = await response.json();
        setItineraries(itineraryList);
        console.log(itineraryList);
      })();
    } catch (error) {
      console.error("Error with request: ", error);
    }
  }, []);

  const deleteItinerary = async (e) => {
    const tripId = e.target.parentNode.parentNode.id;
    try {
      const response = await fetch("api/trip/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify({ tripId: tripId }),
      });
      const remainingTrips = await response.json();
      setItineraries(remainingTrips);
    } catch (err) {
      console.error("Error with request: ", err);
    }
  };

  const seeDetails = async (e) => {
    const tripId = e.target.parentNode.parentNode.id;
    const matchingTrips = itineraries.filter(trip => trip._id === tripId);
    const foundTrip: CompleteItinerary = JSON.parse(matchingTrips[0].trip).itinerary;

    console.log("See Details of:", foundTrip);

    if (foundTrip) {
      dispatch(updateItineraryAndId({ itinerary: foundTrip, id: tripId }));
      navigate("/itinerary");
    } else throw new Error('Sorry, we couldn\'t find that trip.');
  };

  const renderList = itineraries.map(itinerary => {
    const { _id, destination, startDate, endDate, createdAt } = itinerary;
    return (
      <div className="trip-tile" key={_id} id={_id}>
        <h3>{destination}</h3>
        <p>
          From: <b>{startDate}</b>
        </p>
        <p>
          To: <b>{endDate}</b>
        </p>
        <p>
          Created on: <b>{new Date(createdAt).toLocaleString()}</b>
        </p>
        <div className="tile-buttons">
          <button onClick={seeDetails}>See Details</button>
          <button onClick={deleteItinerary}>Delete</button>
        </div>
      </div>
    );
  });

  return (
    <div>
      <Header />
      <h2>Itinerary Manager</h2>
      <div id="itinerary-grid">{renderList}</div>
    </div>
  );
};

export default Manager;
