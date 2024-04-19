import { Outlet } from 'react-router-dom';

import Header from './Header';

const Form = () => {
  
  return (
    <>
      <Header />
      <div className="form-container">
        <div>
          <h2>Enter in your travel details...</h2>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Form;