import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { updateActivities } from '../../reducers/tripReducer';

const Page3 = () => {
  const navigate = useNavigate();

  const { activities } = useSelector(state => state.trip);

  const dispatch = useDispatch();

  const selected = new Array(...activities);

  const handleActivitiesChange = e => {
    const { value, checked } = e.target;
    if (checked) {
      selected.push(value);
    } else {
      const index = selected.indexOf(value);
      selected.splice(index, 1);
    }
    dispatch(updateActivities(selected));
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      navigate('/form/page4');
    }
  };

  return (
    <div className="activities-container">
      <p>Select activities you are interested in...</p>
      <ul className="activities">
        <li>
          <label>
            <input
              type="checkbox"
              value="Hiking"
              onChange={handleActivitiesChange}
              checked={activities.includes('Hiking')}
              onKeyDown={handleKeyDown}
            />
            Hiking
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              value="local events"
              onChange={handleActivitiesChange}
              checked={activities.includes('local events')}
              onKeyDown={handleKeyDown}
            />
            Local Events
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              value="restaurants"
              onChange={handleActivitiesChange}
              checked={activities.includes('restaurants')}
              onKeyDown={handleKeyDown}
            />
            Restaurants
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              value="danger"
              onChange={handleActivitiesChange}
              checked={activities.includes('danger')}
              onKeyDown={handleKeyDown}
            />
            Danger
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              value="safety"
              onChange={handleActivitiesChange}
              checked={activities.includes('safety')}
              onKeyDown={handleKeyDown}
            />
            Safety
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              value="museums"
              onChange={handleActivitiesChange}
              checked={activities.includes('museums')}
              onKeyDown={handleKeyDown}
            />
            Museums
          </label>
        </li>
      </ul>
      <div>
        <Link to='/form/page2'>
          <button type='button'>Back</button>
        </Link>
        <Link to='/form/page4'>
          <button type='button'>Next</button>
        </Link>
      </div>
    </div>
  );
};

export default Page3;