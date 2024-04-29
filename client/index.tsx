import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './components/app/index.js';
import Manager from './components/manager/index.js';
import Main from './components/main/index.js';
import About from './components/about/index.js';
import Login from './components/login/index.js';
import Form from './components/form/index.js';
import { DestinationPage, DatesPage, ActivitiesPage, BudgetPage, TravelerNumberPage, TravelerTypeSubmitPage } from './components/user-options-pages/index.ts';
import CompleteItinerary from './components/complete-itinerary/index.js';
import Register from './components/register/index.js';
import { store } from './store.ts';
import './styles.css';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Main />} />
            <Route path='/manager' element={<Manager />} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path="/form" element={<Form />}>
              <Route index element={<DestinationPage />} />
              <Route path="/form/dates-select" element={<DatesPage/>} />
              <Route path="/form/activities-select" element={<ActivitiesPage />} />
              <Route path="/form/budget-select" element={<BudgetPage />} />
              <Route path="/form/number-traveler-select" element={<TravelerNumberPage />} />
              <Route path="/form/type-traveler-select" element={<TravelerTypeSubmitPage />} />
            </Route>
          </Route>
          <Route path="/itinerary" element={<CompleteItinerary />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);