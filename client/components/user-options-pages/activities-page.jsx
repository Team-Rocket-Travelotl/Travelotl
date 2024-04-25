import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { updateActivities } from '../../reducers/tripReducer';

const ActivitiesPage = () => {
  // page 3

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { activities } = useSelector(state => state.trip);

  const updateSelectedActivities = () => {
    const inputFields = new Array(...document.getElementsByTagName('input'));
    const newSelectedActivities = inputFields.filter(box => box.checked).map(field => field.value);
    dispatch(updateActivities(newSelectedActivities));
  }

  const saveAndContinue = (event) => {
    if (event.type == 'keydown' && event.key !== 'Enter') return;
    else if (event) event.preventDefault();
    updateSelectedActivities();
    navigate('/form/budget-select');
  };

  const activitiesList = ['Hiking', 'Local Events', 'Restaurants', 'Danger', 'Safety', 'Museums'];
  const listItems = activitiesList.map(act => {
    return <li className='activity-card'>
      <label>
        <input
          type='checkbox'
          defaultChecked={activities.includes(act)}
          value={act}
          onKeyDown={saveAndContinue}
        />
        {act}
      </label>
    </li>
  });

  return (
    <div className="bg-gray-300 rounded border-4 border-black ">
      <p className='text-2xl text-center'>Select activities you are interested in...</p>
      <ul className="activities">
        {listItems}
      </ul>
      <div>
        <Link to='/form/dates-select'>
          <button className='m-4 underline text-blue-600' type='button'>Back</button>
        </Link>
        <button className='m-4 underline text-blue-600' type='button' onClick={saveAndContinue}>Next</button>
      </div>
    </div>
  );
};

export default ActivitiesPage;