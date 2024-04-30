import React, { KeyboardEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateActivities } from '../../reducers/tripReducer.ts';
import { useAppDispatch, useAppSelector } from '../../hooks.ts';

const ActivitiesPage = () => {
  // page 3

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const prevPage = '/form/dates-select';
  const nextPage = '/form/budget-select';

  const { activities } = useAppSelector(state => state.trip);

  const [navDirection, setNavDirection] = useState<string>('');

  const updateSelectedActivities = (navDirection: string) => {
    const inputFields = new Array(...document.getElementsByTagName('input'));
    const newSelectedActivities = inputFields.filter(box => box.checked).map(field => field.value);
    if (!newSelectedActivities.length && navDirection !== 'back') {
      alert('Must select at least one activity');
      throw new Error;
    }
    dispatch(updateActivities(newSelectedActivities));
  }

  function saveAndContinue() {
    updateSelectedActivities(navDirection);
    navigate(navDirection === 'back' ? prevPage : nextPage);
  };

  const handleEnterKey = (event: KeyboardEvent) => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    setNavDirection('next');
  }

  const activitiesList = ['Hiking', 'Local Events', 'Restaurants', 'Danger', 'Safety', 'Museums'];
  const listItems = activitiesList.map(act => {
    return <li className='activity-card' key={act}>
      <label>
        <input
          type='checkbox'
          defaultChecked={activities.includes(act)}
          value={act}
        />
        {act}
      </label>
    </li>
  });

  return (
    <div className="bg-gray-300 rounded border-4 border-black" onKeyDown={handleEnterKey}>
      <p className='text-2xl text-center'>Select activities you are interested in...</p>
      <ul className="activities">
        {listItems}
      </ul>
      <div>
        <button className='m-4 underline text-blue-600' type='button' value='back' onClick={() => { setNavDirection('back'); saveAndContinue; }}>Back</button>
        <button className='m-4 underline text-blue-600' type='button' value='next' onClick={() => { setNavDirection('next'); saveAndContinue; }}>Next</button>
      </div>
    </div>
  );
};

export default ActivitiesPage;