import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import tripReducer from './reducers/tripReducer';
import itineraryReducer from './reducers/itineraryReducer';
import App from './App';
import Manager from './components/Manager';
import About from './components/About';
import Login from './components/Login';
import Form from './components/Form';
import Register from './components/Register';
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
          <Route path="/" element={<App />} />
          <Route path='/manager' element={<Manager />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path="/form" element={<Form />} />
          // Add more routes as needed
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);