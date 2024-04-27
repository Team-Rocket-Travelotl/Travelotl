import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateBudget } from '../../reducers/tripReducer';

const BudgetPage = () => {
  // page 4

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const prevPage = '/form/activities-select';
  const nextPage = '/form/number-traveler-select';

  const { budget } = useSelector(state => state.trip);

  const updateSelectedBudget = (navDirection) => {
    const budgetInput = document.getElementById('budget-input').value;
    if (budgetInput === '' && navDirection !== 'back') {
      alert('Must enter value for Budget');
      throw new Error;
    }
    dispatch(updateBudget(budgetInput));
  }

  const saveAndContinue = (event) => {
    if (event.type == 'keydown' && event.key !== 'Enter') return;
    else if (event) event.preventDefault();
    updateSelectedBudget(event.target.value);
    navigate(event.target.value === 'back' ? prevPage : nextPage);
  };

  return (
    <div className="bg-gray-300 rounded border-4 border-black">
      <label className='text-2xl' htmlFor="budget">
        Budget:
      </label>
      <input required className='typed-input'
        id='budget-input'
        type='number'
        placeholder='Enter desired budget'
        defaultValue={budget}
        onKeyDown={saveAndContinue}
      />
      <div>
        <button className='m-4 underline text-blue-600' type='button' value='back' onClick={saveAndContinue}>Back</button>
        <button className='m-4 underline text-blue-600' type='button' value='next' onClick={saveAndContinue}>Next</button>
      </div>
    </div>
  );
};

export default BudgetPage;