import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { updateStartDate, updateEndDate } from '../../reducers/tripReducer';

const Page2 = () => {
  const navigate = useNavigate();

  const { startDate, endDate } = useSelector(state => state.trip);
  
  const dispatch = useDispatch();

  const handleInputChange = e => {
    const { name, value } = e.target;
    if (name === 'startDate') {
      dispatch(updateStartDate(value));
    } else {
      dispatch(updateEndDate(value));
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      navigate('/form/page3');
    }
  };

  return (
    <>
      <div>
        <label htmlFor="startDate">
          Start Date:
        </label>
        <input type="date"
          name="startDate"
          value={startDate}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div>
        <label htmlFor="endDate">
          End Date:
        </label>
        <input
          type="date"
          name="endDate"
          value={endDate}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div>
        <Link to='/form'>
          <button type='button'>Back</button>
        </Link>
        <Link to='/form/page3'>
          <button type='button'>Next</button>
        </Link>
      </div>
    </>
  );
};

export default Page2;