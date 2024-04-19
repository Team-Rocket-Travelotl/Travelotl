import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { updateTravelers } from "../../reducers/tripReducer";

const Page5 = () => {
  const { travelers } = useSelector((state) => state.trip);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = e => {
    const { value } = e.target;
    dispatch(updateTravelers(value));
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      navigate('/form/page6');
    }
  };

  return (
    <div>
      <label htmlFor="travelers">
        No. of Travelers:
      </label>
      <input
        type="number"
        name="travelers"
        value={travelers}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <div>
        <Link to='/form/page4'>
          <button type='button'>Back</button>
        </Link>
        <Link to='/form/page6'>
          <button type='button'>Next</button>
        </Link>
      </div>
    </div>
  );
};

export default Page5;