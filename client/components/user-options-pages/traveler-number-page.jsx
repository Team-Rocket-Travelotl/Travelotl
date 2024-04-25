import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { updateTravelers } from "../../reducers/tripReducer";

const TravelerNumberPage = () => {
  // page 5
  
  const { travelers } = useSelector((state) => state.trip);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateSelectedTravelerNumber = () => {
    const numTravelers = document.getElementById('travelers').value;
    dispatch(updateTravelers(numTravelers));
  }

  const saveAndContinue = (event) => {
    if (event.type == 'keydown' && event.key !== 'Enter') return;
    else if (event) event.preventDefault();
    updateSelectedTravelerNumber();
    navigate('/form/submit');
  };

  return (
    <div className="bg-gray-300 rounded border-4 border-black">
      <label className='text-2xl' htmlFor="travelers">
        No. of Travelers:
      </label>
      <input className="typed-input"
        type="number"
        id="travelers"
        defaultValue={travelers}
        onKeyDown={saveAndContinue}
      />
      <div>
        <Link to='/form/budget-select'>
          <button className='m-4 underline text-blue-600' type='button'>Back</button>
        </Link>
        <button className='m-4 underline text-blue-600' type='button' onClick={saveAndContinue}>Next</button>
      </div>
    </div>
  );
};

export default TravelerNumberPage;