import React from "react";
import { useNavigate } from "react-router-dom";
import { updateTravelers } from "../../reducers/tripReducer.ts";
import { useAppDispatch, useAppSelector } from "../../hooks.ts";

const TravelerNumberPage = () => {
  // page 5

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const prevPage = '/form/budget-select';
  const nextPage = '/form/type-traveler-select';

  const { travelers } = useAppSelector((state) => state.trip);

  const updateSelectedTravelerNumber = (navDirection: string) => {
    const numTravelers = (document.getElementById('travelers') as HTMLInputElement).value;
    if (Number(numTravelers) <= 0 && navDirection === 'next') {
      alert('Must enter numerical value greater than zero for Number of Travelers');
      throw new Error;
    }
    dispatch(updateTravelers(Number(numTravelers)));
  }

  const saveAndContinue = (event) => {
    if (event.type == 'keydown' && event.key !== 'Enter') return;
    else if (event) event.preventDefault();
    updateSelectedTravelerNumber(event.target.value);
    navigate(event.target.value === 'back' ? prevPage : nextPage);
  };

  return (
    <div className="bg-gray-300 rounded border-4 border-black" onKeyDown={saveAndContinue}>
      <label className='text-2xl' htmlFor="travelers">
        No. of Travelers:
      </label>
      <input className="typed-input"
        type="number"
        id="travelers"
        placeholder='Enter number of travelers'
        defaultValue={travelers}
      />
      <div>
        <button className='m-4 underline text-blue-600' type='button' value='back' onClick={saveAndContinue}>Back</button>
        <button className='m-4 underline text-blue-600' type='button' value='next' onClick={saveAndContinue}>Next</button>
      </div>
    </div>
  );
};

export default TravelerNumberPage;