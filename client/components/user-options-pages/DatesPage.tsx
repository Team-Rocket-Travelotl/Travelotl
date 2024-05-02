import React, { KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks.ts';
import { updateStartDate, updateEndDate } from '../../reducers/tripReducer.ts';
import pageRoutes from '../../constants/routes';
import navigationDirections from '../../constants/navigationDirections';

const DatesPage = () => {
  // page 2

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { startDate, endDate } = useAppSelector(state => state.trip);
  const { DESTINATION: prevPage, ACTIVITIES: nextPage } = pageRoutes;
  const { NEXT, BACK } = navigationDirections;
  
  const updateSelectedDates = () => {
    const startDate = (document.getElementById('start-date') as HTMLInputElement).value;
    const endDate = (document.getElementById('end-date') as HTMLInputElement).value;
    dispatch(updateStartDate(startDate));
    dispatch(updateEndDate(endDate));
  }

  const saveAndContinue = (navDirection: string) => {
    updateSelectedDates();
    navigate(navDirection === BACK ? prevPage : nextPage);
  };

  const handleEnterKey = (event: KeyboardEvent) => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    saveAndContinue(NEXT);
  }

  return (
    <div className="bg-gray-300 rounded border-4 border-black" onKeyDown={handleEnterKey}>
      <div>
        <label className='text-2xl' htmlFor="startDate">
          Start Date:
        </label>
        <input className='typed-input' 
          type="date"
          id="start-date"
          defaultValue={startDate}
        />
      </div>
      <div>
        <label className='text-2xl' htmlFor="endDate">
          End Date:
        </label>
        <input className='typed-input'
          type="date"
          id="end-date"
          defaultValue={endDate}
        />
      </div>
      <div >
        <button className='m-4 underline text-blue-600' type='button' value='back' onClick={ () => saveAndContinue(BACK) }>Back</button>
        <button className='m-4 underline text-blue-600' type='button' value='next' onClick={ () => saveAndContinue(NEXT) }>Next</button>
      </div>
    </div>
  );
};

export default DatesPage;