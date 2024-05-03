import React, { KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { updateTravelers } from "../../reducers/tripReducer.ts";
import { useAppDispatch, useAppSelector } from "../../hooks.ts";
import pageRoutes from "../../constants/routes.ts";
import navigationDirections from "../../constants/navigationDirections.ts";

const TravelerNumberPage = () => {
  // page 5

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { travelers } = useAppSelector((state) => state.trip);
  const { BUDGET: prevPage, TYPE_TRAVELERS: nextPage } = pageRoutes;
  const { NEXT, BACK } = navigationDirections;

  const updateSelectedTravelerNumber = (navDirection: string) => {
    const numTravelers = (
      document.getElementById("travelers") as HTMLInputElement
    ).value;
    if (Number(numTravelers) <= 0 && navDirection === "next") {
      alert(
        "Must enter numerical value greater than zero for Number of Travelers"
      );
      throw new Error();
    }
    dispatch(updateTravelers(Number(numTravelers)));
  };

  const saveAndContinue = (navDirection: string) => {
    updateSelectedTravelerNumber(navDirection);
    navigate(navDirection === BACK ? prevPage : nextPage);
  };

  const handleEnterKey = (event: KeyboardEvent) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    saveAndContinue(NEXT);
  };

  return (
    <div className="trip-input-box" onKeyDown={handleEnterKey}>
      <label className="text-2xl" htmlFor="travelers">
        No. of Travelers:
      </label>
      <input
        className="typed-input"
        type="number"
        id="travelers"
        placeholder="Enter number of travelers"
        defaultValue={travelers}
      />
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
          type="button"
          value="next"
          onClick={() => saveAndContinue(NEXT)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TravelerNumberPage;
