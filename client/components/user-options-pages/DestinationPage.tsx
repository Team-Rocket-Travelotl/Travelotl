import React, { KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks.ts';
import { updateDestination } from '../../reducers/tripReducer.ts';
import pageRoutes from '../../constants/routes';

const DestinationPage = () => {
  // page 1

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { destination } = useAppSelector(state => state.trip);

  const { DATES: nextPage } = pageRoutes;

  const updateSelectedDestination = () => {
    const selectedDestination = (document.getElementById('destination') as HTMLInputElement).value;
    if (selectedDestination === '') {
      alert('Must enter value for Destination');
      throw new Error;
    }
    dispatch(updateDestination(selectedDestination));
  }

  const saveAndContinue = () => {
    updateSelectedDestination();
    navigate(nextPage);
  };

  const handleEnterKey = (event: KeyboardEvent) => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    saveAndContinue();
  }

  return (
    <div className="bg-gray-300 rounded border-4 border-black" onKeyDown={handleEnterKey}>
      <label className='text-2xl' htmlFor="destination">
        Destination:
      </label>
      <input required className='typed-input'
        type="text"
        id="destination"
        placeholder='Enter destination'
        defaultValue={destination}
      />
      <div>
        <button className='m-4 text-blue-600 underline' type='button' onClick={saveAndContinue}>Next</button>
      </div>
    </div>
  )
};

export default DestinationPage;