import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './components/app/App';
import Manager from './components/manager';
import Main from './components/main';
import About from './components/about';
import Login from './components/login';
import Form from './components/form';
import { Page1, Page2, Page3, Page4, Page5, Page6 } from './components/pages';
import ItineraryContainer from './components/itinerary-dates-container';
import Register from './components/register';
import store from './store.js';
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