import React, { KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { updateActivities } from "../../reducers/tripReducer.ts";
import { useAppDispatch, useAppSelector } from "../../hooks.ts";
import pageRoutes from "../../constants/routes.ts";
import navigationDirections from "../../constants/navigationDirections.ts";

const ActivitiesPage = () => {
  // page 3

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { activities } = useAppSelector((state) => state.trip);
  const { DATES: prevPage, BUDGET: nextPage } = pageRoutes;
  const { NEXT, BACK } = navigationDirections;

  const updateSelectedActivities = (navDirection: string) => {
    const inputFields = new Array(...document.getElementsByTagName("input"));
    const newSelectedActivities = inputFields
      .filter((box) => box.checked)
      .map((field) => field.value);
    if (!newSelectedActivities.length && navDirection !== BACK) {
      alert("Must select at least one activity");
      throw new Error();
    }
    dispatch(updateActivities(newSelectedActivities));
  };

  const saveAndContinue = (navDirection: string) => {
    updateSelectedActivities(navDirection);
    navigate(navDirection === BACK ? prevPage : nextPage);
  };

  const handleEnterKey = (event: KeyboardEvent) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    saveAndContinue(NEXT);
  };

  const activitiesList = [
    "Hiking",
    "Local Events",
    "Restaurants",
    "Danger",
    "Safety",
    "Museums",
    "Wine Tasting",
    "Night Life",
    "Coffee",
    "Books",
    "Foodie",
  ];
  const listItems = activitiesList.map((act) => {
    return (
      <li className="activity-card" key={act}>
        <label>{act}</label>
        <input
          type="checkbox"
          defaultChecked={activities.includes(act)}
          value={act}
        />
      </li>
    );
  });

  return (
    <div className="trip-input-box" onKeyDown={handleEnterKey}>
      <p className="text-2xl text-center">
        Select activities you are interested in...
      </p>
      <ul className="activities">{listItems}</ul>
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

export default ActivitiesPage;
