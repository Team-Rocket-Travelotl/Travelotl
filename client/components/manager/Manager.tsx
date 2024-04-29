import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import TripDetails from "../../models/TripDetails";
import CompleteItinerary from "../../models/CompleteItinerary";
import Header from "../header";
import { setCurrentItineraryDetails } from "../../reducers/itineraryReducer";

const Manager = () => {
  const [itineraries, setItineraries] = useState<TripDetails[]>([]);
  const [userEmails, setUserEmails] = useState(new Map<string, string>());
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
        const userIds: string[] = itineraryList.map(itinerary => itinerary.user);
        const userEmailMap: Map<string, string> = new Map();
        for (const userId of userIds) {
          if (!userEmailMap[userId]) {
            const email = await getEmailById(userId);
            userEmailMap[userId] = email;
          }
        }
        setUserEmails(userEmailMap);
      })();
    } catch (error) {
      console.error("Error with request: ", error);
    }
  }, []);

  const getEmailById = async (_id) => {
    try {
      const response = await fetch(`/api/users/${_id}/email`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user email");
      }
      const { email } = await response.json();
      return email;
    } catch (err) {
      console.error(`error in fetch user email ${err}`);
      return null;
    }
  };

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
    const tripId: string = e.target.parentNode.parentNode.id;
    const matchingTrip = itineraries.filter(trip => trip._id === tripId)[0];
    const userEmail = userEmails[matchingTrip.user];
    let foundTrip: CompleteItinerary; 
    
    // rn we have data coming back in different formats so this grabs the right info depending on which format we get
    if (typeof matchingTrip.trip === 'string') {
      foundTrip = JSON.parse(matchingTrip.trip).hasOwnProperty('itinerary') 
        ? JSON.parse(matchingTrip.trip).itinerary
        : JSON.parse(matchingTrip.trip);
    } else foundTrip = matchingTrip.trip;

    console.log("See Details of:", foundTrip);

    if (foundTrip) {
      dispatch(setCurrentItineraryDetails({ itinerary: foundTrip, id: tripId, userEmail: userEmail }));
      navigate("/itinerary");
    } else throw new Error('Sorry, we couldn\'t find that trip.');
  };

  const renderList = itineraries.map(itinerary => {
    const { _id, destination, startDate, endDate, createdAt, user } = itinerary;
    return (
      <div className="trip-tile" key={_id} id={_id}>
          <p>
          User: <b>{userEmails[user]}</b>
        </p>
        <h3>
          Destination: <b>{destination}</b>
        </h3>
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
