import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { updateDestination } from '../../reducers/tripReducer';

const DestinationPage = () => {
  // page 1

  const navigate = useNavigate();

  const { destination } = useSelector(state => state.trip);
  const dispatch = useDispatch();

  const updateSelectedDestination = () => {
    const selectedDestination = document.getElementById('destination').value;
    dispatch(updateDestination(selectedDestination));
  }

  const saveAndContinue = (event) => {
    if (event.type == 'keydown' && event.key !== 'Enter') return;
    else if (event) event.preventDefault();
    updateSelectedDestination();
    navigate('/form/dates-select');
  };

  return (
    <div className="bg-gray-300 rounded border-4 border-black">
      <label className='text-2xl' htmlFor="destination">
        Destination:
      </label>
      <input className='typed-input'
        type="text"
        id="destination"
        defaultValue={destination}
        onKeyDown={saveAndContinue}
      />
      <div>
        <button className='m-4 text-blue-600 underline' type='button' onClick={saveAndContinue}>Next</button>
      </div>
    </div>
  )
};

export default DestinationPage;