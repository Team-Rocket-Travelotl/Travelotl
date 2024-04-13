import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import tripReducer from './reducers/tripReducer';
import App from './App';
import About from './components/About';
import Login from './components/Login';
import '../styles.css';

const store = configureStore({
  reducer: {
    trip: tripReducer,
  }
});

const root = document.getElementById('root');

createRoot(root).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path='/about' element={<About />} />
          <Route path='login' element={<Login />} />
          // Add more routes as needed
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);