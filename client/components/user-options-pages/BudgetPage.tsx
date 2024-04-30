import React, { KeyboardEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateBudget } from '../../reducers/tripReducer.ts';
import { useAppDispatch, useAppSelector } from '../../hooks.ts';

const BudgetPage = () => {
  // page 4

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const prevPage = '/form/activities-select';
  const nextPage = '/form/number-traveler-select';

  const { budget } = useAppSelector(state => state.trip);

  const [navDirection, setNavDirection] = useState<string>('');

  const updateSelectedBudget = (navDirection: string) => {
    const budgetInput = (document.getElementById('budget-input') as HTMLInputElement).value;
    if (Number(budgetInput) <= 0 && navDirection === 'next') {
      alert('Must enter numerical value greater than zero for Budget');
      throw new Error;
    }
    dispatch(updateBudget(Number(budgetInput)));
  }

  const saveAndContinue = (event?: MouseEvent) => {
    updateSelectedBudget(navDirection);
    navigate(navDirection === 'back' ? prevPage : nextPage);
  };

  const handleEnterKey = (event: KeyboardEvent) => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    setNavDirection('next');
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
        <button className='m-4 underline text-blue-600' type='button' value='back' onClick={() => { setNavDirection('back'); saveAndContinue; }}>Back</button>
        <button className='m-4 underline text-blue-600' type='button' value='next' onClick={() => { setNavDirection('next'); saveAndContinue; }}>Next</button>
      </div>
    </div>
  );
};

export default BudgetPage;