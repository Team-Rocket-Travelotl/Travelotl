import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks.ts';
import { updateDestination } from '../../reducers/tripReducer.ts';

const DestinationPage = () => {
  // page 1

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const nextPage = '/form/dates-select';

  const { destination } = useAppSelector(state => state.trip);

  const updateSelectedDestination = (navDirection: string) => {
    const selectedDestination = (document.getElementById('destination') as HTMLInputElement).value;
    if (selectedDestination === '' && navDirection !== 'back') {
      alert('Must enter value for Destination');
      throw new Error;
    }
    dispatch(updateDestination(selectedDestination));
  }

  const saveAndContinue = (event) => {
    if (event.type == 'keydown' && event.key !== 'Enter') return;
    else if (event) event.preventDefault();
    updateSelectedDestination(event.target.value);
    navigate(nextPage);
  };

  return (
    <div className="bg-gray-300 rounded border-4 border-black" onKeyDown={saveAndContinue}>
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