import React, { ReactElement, useState } from "react";
import Map from "../map/Map";
import Header from "../header/index.ts";
import SingleDayItinerary from "../single-day-itinerary/index.ts";
import { useAppSelector } from "../../hooks.ts";
import CompleteItinerary from "../../models/CompleteItinerary.ts";

const CompleteDisplayItinerary = () => {
  const { itinerary, id, /* userEmail */ } = useAppSelector(state => state.itinerary);
  const [editedItinerary, setEditedItinerary] = useState<CompleteItinerary>(itinerary);

  console.log('complete itinerary:', itinerary)
  console.log('id: ', id)

  //=======> HANDLE CLICK <============
  const handleClick = async () => {
    console.log("state to send to back end", editedItinerary);
    try {
      const response = await fetch("/api/trip/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify(editedItinerary),
      });
      if (response.ok) {
        console.log("successful patch");
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
            />
          </div>
        </div>
      );
    });
  }

  const itineraryItems = itinerary !== undefined ? (
    <div id="itinerary-details">
      {/* <div>
        <h3>User Email: {localStorage.getItem('userEmail')}</h3>
      </div> */}
      <h2>Your Itinerary</h2>
      {dateComponents}
      <button onClick={handleClick}>Save Changes</button>
    </div>
  ) : <h2>No itinerary currently selected</h2>;

  return (
    <div>
      <Header />
      {itineraryItems}
    </div>
  );
};

export default CompleteDisplayItinerary;
