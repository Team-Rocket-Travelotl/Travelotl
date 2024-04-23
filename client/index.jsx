import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import tripReducer from './reducers/tripReducer';
import itineraryReducer from './reducers/itineraryReducer';

import App from './App';
import Manager from './components/manager/Manager';
import Main from './components/main/Main';

import About from './components/about/About';
import Login from './components/login/Login';
import Form from './components/form/Form';
import Page1 from './components/pages/Page1';
import Page2 from './components/pages/Page2';
import Page3 from './components/pages/Page3';
import Page4 from './components/pages/Page4';
import Page5 from './components/pages/Page5';
import Page6 from './components/pages/Page6';
import ItineraryContainer from './components/itinerary-container/ItineraryContainer';
import Register from './components/register/Register';
import '../styles.css';

export const store = configureStore({
  reducer: {
    trip: tripReducer,
    itinerary: itineraryReducer,
  }
});

const root = document.getElementById('root');

createRoot(root).render(
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
              <Route index element={<Page1 />} />
              <Route path="/form/page2" element={<Page2 />} />
              <Route path="/form/page3" element={<Page3 />} />
              <Route path="/form/page4" element={<Page4 />} />
              <Route path="/form/page5" element={<Page5 />} />
              <Route path="/form/page6" element={<Page6 />} />
            </Route>
          </Route>
          <Route path="/itinerary" element={<ItineraryContainer />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);