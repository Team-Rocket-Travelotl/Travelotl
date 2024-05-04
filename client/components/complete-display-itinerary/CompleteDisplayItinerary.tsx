import React, { ReactElement, useState } from "react";
import Header from "../header/index.ts";
import SingleDayItinerary from "../single-day-itinerary/index.ts";
import { useAppDispatch, useAppSelector } from "../../hooks.ts";
import CompleteItinerary from "../../models/CompleteItinerary.ts";
import { setCurrentItineraryDetails } from "../../reducers/itineraryReducer.ts";

const CompleteDisplayItinerary = () => {
  const dispatch = useAppDispatch();
  const { itinerary, id, userEmail } = useAppSelector(
    state => state.itinerary
  );
  const [editedItinerary, setEditedItinerary] =
    useState<CompleteItinerary>(itinerary);
  const [changesMade, setChangesMade] = useState<boolean>(false);

  console.log("complete itinerary:", itinerary);
  console.log("id: ", id);

  //=======> HANDLE CLICK <============
  const handleClick = async () => {
    if (!changesMade) return;
    // console.log("state to send to back end", editedItinerary);
    try {
      const response = await fetch("/api/trip/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify({ itinerary: { ...editedItinerary }, _id: id }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        console.log('successful patch');
        setChangesMade(false);
        dispatch(setCurrentItineraryDetails({ itinerary: data.trip, id: data._id, userEmail }))
      } else {
        throw new Error("failed to retrieve data");
      }
    } catch (error) {
      console.error("Error with patch request:", error);
    }
  };

  let dates: string[];
  let dateComponents: ReactElement[] = [];

  if (itinerary) {
    dates = Object.keys(itinerary);

    dateComponents = dates.map((date) => {
      return (
        <div className="day-entry" key={date}>
          <h2 className="date">{date}</h2>
          <div className="day-details">
            <SingleDayItinerary
              editedItinerary={editedItinerary}
              dateObj={itinerary[date]}
              date={date}
              setEditedItinerary={setEditedItinerary}
              setChangesMade={setChangesMade}
            />
          </div>
        </div>
      );
    });
  }

  const itineraryItems =
    itinerary !== undefined ? (
      <div id="itinerary-details">
        {/* <div>
        <h3>User Email: {localStorage.getItem('userEmail')}</h3>
      </div> */}
        <h2 className="text-2xl text-center font-bold lobster-regular">
          Your Itinerary
        </h2>
        {dateComponents}
        <button className="button-style" onClick={handleClick}>
          Save Changes
        </button>
      </div>
    ) : (
      <h2 className="text-2xl text-center font-bold lobster-regular">
        No itinerary currently selected
      </h2>
    );

  return (
    <div>
      <Header />
      {itineraryItems}
    </div>
  );
};

export default CompleteDisplayItinerary;
