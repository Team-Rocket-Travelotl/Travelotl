import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateItinerary } from "../../reducers/itineraryReducer";
import { Link, useNavigate } from "react-router-dom";
import Header from "../header/Header";

const Manager = () => {
  const [itineraries, setItineraries] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userEmails, setUserEmails] = useState({});
  const user = useSelector((state) => state.itinerary.user);
  // Retrieve all itineraries associated with the user and update state

  useEffect(() => {
    try {
      const getItineraryList = async () => {
        let itineraryList = await fetch("api/trip/retrieve", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        });

        itineraryList = await itineraryList.json();

        console.log(itineraryList);
        setItineraries(itineraryList);

        const userIds = itineraryList.map((itinerary) => itinerary.user);
        const userEmailMap = {};
        for (const userId of userIds) {
          if (!userEmails[userId]) {
            const email = await getEmailById(userId);
            userEmailMap[userId] = email;
          }
        }
        setUserEmails((prevUserEmails) => ({
          ...prevUserEmails,
          ...userEmailMap,
        }));
      };

      getItineraryList();
    } catch (error) {
      console.error("Error with request:", error);
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
      let remainingTrips = await fetch("api/trip/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify({ tripId: tripId }),
      });

      remainingTrips = await remainingTrips.json();

      setItineraries(remainingTrips);
    } catch (err) {
      console.error("Error with request:", error);
    }
  };

  const seeDetails = async (e) => {
    const tripId = e.target.parentNode.parentNode.id;
    

    try {
      let itineraryList = await fetch("api/trip/retrieve", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });

      itineraryList = await itineraryList.json();

      //console.log(itineraryList);

      let foundTrip;
      for (const trip of itineraryList) {
        console.log("manager", trip);
        // console.log("Parse ID:", trip.tripId, "| Target ID:", tripId)
        if (trip._id === tripId) {
          foundTrip = JSON.parse(trip.trip);
          break;
        }
      }
      console.log("See Details of:", foundTrip);
      if (foundTrip) {
        dispatch(updateItinerary(foundTrip.itinerary));
        navigate("/itinerary");
      }
    } catch (error) {
      console.error("Error with request:", error);
    }
  };

  const itineraryList = [...itineraries];
  const renderList = itineraryList.map((itinerary) => {
    //let email = getEmailById(itinerary.user);
    return (
      <div className="trip-tile" key={itinerary._id} id={itinerary._id}>
        <p>
          User: <b>{userEmails[itinerary.user]}</b>
        </p>
        <h3>
          Destination: <b>{itinerary.destination}</b>
        </h3>
        <p>
          From: <b>{itinerary.startDate}</b>
        </p>
        <p>
          To: <b>{itinerary.endDate}</b>
        </p>
        <p>
          Created on: <b>{new Date(itinerary.createdAt).toLocaleString()}</b>
        </p>

        <div className="tile-buttons">
          <button onClick={seeDetails}>See Details</button>
          <button onClick={deleteItinerary}>Delete</button>
        </div>
      </div>
    );
  });
  // state: { itinerary: { itinerary: itinerary.trip }}
  // to={{ pathname: '/other', state: dataToPass }}

  return (
    <div>
      <Header />
      <h2>Itinerary Manager</h2>
      <div id="itinerary-grid">{renderList}</div>
    </div>
  );
};

export default Manager;
