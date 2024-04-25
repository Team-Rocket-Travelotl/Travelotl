import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { updateBudget } from '../../reducers/tripReducer';

const BudgetPage = () => {
  // page 4

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { budget } = useSelector(state => state.trip);

  const updateSelectedBudget = () => {
    const budgetInput = document.getElementById('budget-input').value;
    dispatch(updateBudget(budgetInput));
  }

  const saveAndContinue = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      updateSelectedBudget();
      navigate('/form/page5');
    }
  };

  return (
    <div className="bg-gray-300 rounded border-4 border-black">
      <label className='text-2xl' htmlFor="budget">
        Budget:
      </label>
      <input className='typed-input'
        id='budget-input'
        type="number"
        name="budget"
        defaultValue={budget}
        onKeyDown={saveAndContinue}
      />
      <div>
        <Link to='/form/page3'>
          <button className='m-4 underline text-blue-600' type='button'>Back</button>
        </Link>
        <Link to='/form/page5'>
          <button className='m-4 underline text-blue-600' type='button' onClick={updateSelectedBudget}>Next</button>
        </Link>
      </div>
    </div>
  );
};

export default BudgetPage;