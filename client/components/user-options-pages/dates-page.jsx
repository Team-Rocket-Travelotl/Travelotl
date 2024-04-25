import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { updateStartDate, updateEndDate } from '../../reducers/tripReducer';

const DatesPage = () => {
  // page 2

  const navigate = useNavigate();

  const { startDate, endDate } = useSelector(state => state.trip);
  
  const dispatch = useDispatch();

  const updateSelectedDates = () => {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    dispatch(updateStartDate(startDate));
    dispatch(updateEndDate(endDate));
  }

  const saveAndContinue = (event) => {
    if (event.type == 'keydown' && event.key !== 'Enter') return;
    else if (event) event.preventDefault();
    updateSelectedDates();
    navigate('/form/activities-select');
  };

  return (
    <div className="bg-gray-300 rounded border-4 border-black">
      <div>
        <label className='text-2xl' htmlFor="startDate">
          Start Date:
        </label>
        <input className='typed-input' 
          type="date"
          id="start-date"
          defaultValue={startDate}
          onKeyDown={saveAndContinue}
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
          onKeyDown={saveAndContinue}
        />
      </div>
      <div >
        <Link to='/form'>
          <button className='m-4 underline text-blue-600' type='button'>Back</button>
        </Link>
        <button className='m-4 underline text-blue-600' type='button' onClick={saveAndContinue}>Next</button>
      </div>
    </div>
  );
};

export default DatesPage;