import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks.ts';
import { setCurrentItineraryDetails } from '../../reducers/itineraryReducer.ts';
import { updateGroupDescription } from '../../reducers/tripReducer.ts';
import Loader from '../loader';

const TravelerTypeSubmitPage = () => {
  // page 6

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const prevPage = '/form/number-traveler-select';
 
  const { groupDescription } = useAppSelector(state => state.trip);
  const userOptions = useAppSelector(state => state.trip);

  const [loading, setLoading] = useState(false);

  const updateSelectedTravelerType = () => {
    const inputFields = new Array(...document.getElementsByTagName('input'));
    const selectedTravelerType = inputFields.filter(radio => radio.checked)[0].value;
    dispatch(updateGroupDescription(selectedTravelerType));
  }

  const submit = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/trip/build', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
        },
        body: JSON.stringify(userOptions)
      });
      const parsedData = await response.json();

      setLoading(false);

      if (response.ok) {
        dispatch(setCurrentItineraryDetails(parsedData));
        navigate('/itinerary');
      } else throw new Error('failed to retrieve data');
    } catch (error) {
      console.error('Error with request:', error);
    }
  };

  const saveAndContinue = async (event) => {
    if (event.type == 'keydown' && event.key !== 'Enter') return;
    else if (event) event.preventDefault();
    updateSelectedTravelerType();
    event.target.value === 'back' ? navigate(prevPage) : submit();
  };

  const travelerTypes = ['Solo traveler', 'Family with young kids', 'Family of all ages', 'Family of adults', 'Friends'];

  const travelerTypeItems = travelerTypes.map(type => {
    return (
      <li key={type}>
        <label className='group-card'>
          <input 
            type='radio'
            name='group-description'
            value={type}
            defaultChecked={groupDescription === type}
          />
          {type}
        </label>
      </li>
    );
  });

  return (
    <div className="bg-gray-300 rounded border-4 border-black" onKeyDown={saveAndContinue}>
      <div>{
        loading ? <div id='loader'><Loader/></div> :
        <>
          <p>What best describes your travel group...</p>
          <ul className="groups">
            {travelerTypeItems}
          </ul>
          <div>
            <button className='m-4 underline text-blue-600' type='button' value='back' onClick={saveAndContinue}>Back</button>
            <button className='m-4 underline text-blue-600' type='submit' value='submit' onClick={saveAndContinue}>Submit</button>
          </div>
        </>  
      }</div>
    </div>
  );
};

export default TravelerTypeSubmitPage;