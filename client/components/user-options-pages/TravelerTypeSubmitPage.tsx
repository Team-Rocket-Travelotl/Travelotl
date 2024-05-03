import React, { useState, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setCurrentItineraryDetails } from "../../reducers/itineraryReducer";
import { updateGroupDescription } from "../../reducers/tripReducer";
import Loader from "../loader";
import CompleteItinerary from "../../models/CompleteItinerary";
import pageRoutes from "../../constants/routes";
import navigationDirections from "../../constants/navigationDirections";
import TripDetails from "../../models/TripDetails";

const TravelerTypeSubmitPage = () => {
  // page 6

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { NUMBER_TRAVELERS: prevPage } = pageRoutes;
  const { NEXT, BACK } = navigationDirections;

  const { groupDescription } = useAppSelector((state) => state.trip);
  const userOptions = useAppSelector((state) => state.trip);
  const [loading, setLoading] = useState(false);

  const updateSelectedTravelerType = () => {
    const inputFields = new Array(...document.getElementsByTagName("input"));
    const selectedTravelerType = inputFields.filter((radio) => radio.checked)[0]
      .value;
    dispatch(updateGroupDescription(selectedTravelerType));
  };

  const submit = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/trip/build", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify(userOptions),
      });
      const parsedData: TripDetails = await response.json();
      console.log(parsedData);

      setLoading(false);

      if (response.ok) {
        // get user email from backend to display in Itinerary?
        dispatch(
          setCurrentItineraryDetails({
            itinerary: parsedData.trip,
            id: parsedData._id,
            userEmail: "placeholder",
          })
        );
        navigate("/itinerary");
      } else throw new Error("failed to retrieve data");
    } catch (error) {
      console.error("Error with request:", error);
    }
  };

  const saveAndContinue = (navDirection: string) => {
    updateSelectedTravelerType();
    navDirection === BACK ? navigate(prevPage) : submit();
  };

  const handleEnterKey = (event: KeyboardEvent) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    saveAndContinue(NEXT);
  };

  const travelerTypes = [
    "Solo traveler",
    "Family with young kids",
    "Family of all ages",
    "Family of adults",
    "Friends",
  ];

  const travelerTypeItems = travelerTypes.map((type) => {
    return (
      <li key={type}>
        <label className="group-card">
          <input
            type="radio"
            name="group-description"
            value={type}
            defaultChecked={groupDescription === type}
            style={{
              border: 0,
              width: 20,
              height: 20,
              borderRadius: "50%",
              marginRight: 5,
            }}
          />
          {type}
        </label>
      </li>
    );
  });

  return (
    <div className="trip-input-box" onKeyDown={handleEnterKey}>
      <div>
        {loading ? (
          <div id="loader">
            <Loader />
          </div>
        ) : (
          <>
            <p>What best describes your travel group...</p>
            <ul className="groups">{travelerTypeItems}</ul>
            <div className="button-container">
              <button
                className="button-style"
                type="button"
                value="back"
                onClick={() => saveAndContinue(BACK)}
              >
                Back
              </button>
              <button
                className="button-style"
                type="submit"
                value="submit"
                onClick={() => saveAndContinue(NEXT)}
              >
                Submit
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TravelerTypeSubmitPage;
