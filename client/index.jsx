import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./components/app/App";
import Manager from "./components/manager";
import MyItinerary from "./components/myitinerary";
import Main from "./components/main";
import About from "./components/about";
import Login from "./components/login";
import Form from "./components/form";
import Logout from "./components/logout";
import {
  DestinationPage,
  DatesPage,
  ActivitiesPage,
  BudgetPage,
  TravelerNumberPage,
  TravelerTypeSubmitPage,
} from "./components/user-options-pages/index.js";
import CompleteItinerary from "./components/complete-itinerary";
import Register from "./components/register";
import store from "./store.js";
import "./styles.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Main />} />
            <Route path="/manager" element={<Manager />} />
            <Route path="/myitinerary" element={<MyItinerary />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/form" element={<Form />}>
              <Route index element={<DestinationPage />} />
              <Route path="/form/dates-select" element={<DatesPage />} />
              <Route
                path="/form/activities-select"
                element={<ActivitiesPage />}
              />
              <Route path="/form/budget-select" element={<BudgetPage />} />
              <Route
                path="/form/number-traveler-select"
                element={<TravelerNumberPage />}
              />
              <Route
                path="/form/type-traveler-select"
                element={<TravelerTypeSubmitPage />}
              />
            </Route>
          </Route>
          <Route path="/itinerary" element={<CompleteItinerary />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);
