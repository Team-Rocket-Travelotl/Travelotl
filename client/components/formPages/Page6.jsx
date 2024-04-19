import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { updateGroupDescription } from '../../reducers/tripReducer';

const Page6 = () => {
  const { groupDescription } = useSelector(state => state.trip);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDescriptionChange = e => {
    const { value, checked } = e.target;
    if (checked) {
      dispatch(updateGroupDescription(value));
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      navigate('/itinerary');
    }
  };

  return (
    <div className="group-description-container">
      <p>What best describes your travel group...</p>
      <ul className="group-description">
        <li>
          <label>
            <input
              type="radio"
              name="groupDescription"
              value="Solo traveler"
              onChange={handleDescriptionChange}
              checked={groupDescription === 'Solo traveler'}
              onKeyDown={handleKeyDown}
            />
            Solo traveler
          </label>
        </li>
        <li>
          <label>
            <input
              type="radio"
              name="groupDescription"
              value="Family with young kids"
              onChange={handleDescriptionChange}
              checked={groupDescription === 'Family with young kids'}
              onKeyDown={handleKeyDown}
            />
            Family (young kids)
          </label>
        </li>
        <li>
          <label>
            <input
              type="radio"
              name="groupDescription"
              value="Family of all ages"
              onChange={handleDescriptionChange}
              checked={groupDescription === 'Family of all ages'}
              onKeyDown={handleKeyDown}
            />
            Family (all ages)
          </label>
        </li>
        <li>
          <label>
            <input
              type="radio"
              name="groupDescription"
              value="Family of adults"
              onChange={handleDescriptionChange}
              checked={groupDescription === 'Family of adults'}
              onKeyDown={handleKeyDown}
            />
            Family (adults)
          </label>
        </li>
        <li>
          <label>
            <input
              type="radio"
              name="groupDescription"
              value="Friends"
              onChange={handleDescriptionChange}
              checked={groupDescription === 'Friends'}
              onKeyDown={handleKeyDown}
            />
            Friends
          </label>
        </li>
      </ul>
      <div>
        <Link to='/form/page5'>
          <button type='button'>Back</button>
        </Link>
        <Link to='/itinerary'>
          <button type='submit'>Submit</button>
        </Link>
      </div>
    </div>
  );
};

export default Page6;