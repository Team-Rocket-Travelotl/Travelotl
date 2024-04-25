import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateStartDate, updateEndDate } from '../../reducers/tripReducer';

const DatesPage = () => {
  // page 2

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const prevPage = '/form';
  const nextPage = '/form/activities-select';

  const { startDate, endDate } = useSelector(state => state.trip);
  
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
    navigate(event.target.value === 'back' ? prevPage : nextPage);
  };

  return (
    <div className="bg-gray-300 rounded border-4 border-black" onKeyDown={saveAndContinue}>
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
        <button className='m-4 underline text-blue-600' type='button' value='back' onClick={saveAndContinue}>Back</button>
        <button className='m-4 underline text-blue-600' type='button' value='next' onClick={saveAndContinue}>Next</button>
      </div>
    </div>
  );
};

export default DatesPage;