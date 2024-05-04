import React, { KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks.ts";
import { updateDestination } from "../../reducers/tripReducer.ts";
import pageRoutes from "../../constants/routes";

const DestinationPage = () => {
  // page 1

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { destination } = useAppSelector((state) => state.trip);

  const { DATES: nextPage } = pageRoutes;

  const updateSelectedDestination = () => {
    const selectedDestination = (
      document.getElementById("destination") as HTMLInputElement
    ).value;
    if (selectedDestination === "") {
      alert("Must enter value for Destination");
      throw new Error();
    }
    dispatch(updateDestination(selectedDestination));
  };

  const saveAndContinue = () => {
    updateSelectedDestination();
    navigate(nextPage);
  };

  const handleEnterKey = (event: KeyboardEvent) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    saveAndContinue();
  };

  return (
    <div className="trip-input-box" onKeyDown={handleEnterKey}>
      <label className="text-1xl " htmlFor="destination">
        Destination:
      </label>
      <input
        required
        className="typed-input"
        type="text"
        id="destination"
        placeholder="Enter destination"
        defaultValue={destination}
      />
      <div className="button-container">
        <button
          className="button-style"
          type="button"
          onClick={saveAndContinue}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DestinationPage;
