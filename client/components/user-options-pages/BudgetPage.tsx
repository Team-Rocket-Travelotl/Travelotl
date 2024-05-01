import React, { KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateBudget } from '../../reducers/tripReducer.ts';
import { useAppDispatch, useAppSelector } from '../../hooks.ts';
import pageRoutes from '../../constants/routes.ts';
import navigationDirections from '../../constants/navigationDirections.ts';

const BudgetPage = () => {
  // page 4

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { budget } = useAppSelector(state => state.trip);
  const {ACTIVITIES: prevPage, NUMBER_TRAVELERS: nextPage } = pageRoutes;
  const { NEXT, BACK } = navigationDirections;

  const updateSelectedBudget = (navDirection: string) => {
    const budgetInput = (document.getElementById('budget-input') as HTMLInputElement).value;
    if (Number(budgetInput) <= 0 && navDirection === NEXT) {
      alert('Must enter numerical value greater than zero for Budget');
      throw new Error;
    }
    dispatch(updateBudget(Number(budgetInput)));
  }

  const saveAndContinue = (navDirection: string) => {
    updateSelectedBudget(navDirection);
    navigate(navDirection === BACK ? prevPage : nextPage);
  };

  const handleEnterKey = (event: KeyboardEvent) => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    saveAndContinue(NEXT);
  }

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
        onKeyDown={handleEnterKey}
      />
      <div>
        <button className='m-4 underline text-blue-600' type='button' value='back' onClick={ () => saveAndContinue(BACK) }>Back</button>
        <button className='m-4 underline text-blue-600' type='button' value='next' onClick={ () => saveAndContinue(NEXT) }>Next</button>
      </div>
    </div>
  );
};

export default BudgetPage;