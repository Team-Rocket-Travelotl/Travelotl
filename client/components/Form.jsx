import { useSelector, useDispatch } from 'react-redux';

import Header from './Header';
import Itinerary from './Itinerary';

import { actions as tripActions } from '../reducers/tripReducer';
import { actions as itineraryActions } from '../reducers/itineraryReducer';

const Form = () => {
  const formData = useSelector(state => state.trip);
  const itineraryData = useSelector(state => state.itinerary);
  
  const dispatch = useDispatch();

  const activities = new Array(...formData.activities);

  const updateState = (name, value, actions) => {
    const capName = name.charAt(0).toUpperCase() + name.slice(1);
    const actionName = `update${capName}`;
    dispatch(actions[actionName](value));
  }
  
  const handleInputChange = e => {
    const { name, value } = e.target;
    updateState(name, value, tripActions);
  }
  
  const handleActivitiesChange = e => {
    const { value, checked } = e.target;
    if (checked) {
      activities.push(value);
      updateState('activities', activities, tripActions);
    } else {
      const index = activities.indexOf(value);
      activities.splice(index, 1);
      updateState('activities', activities, tripActions);
    }
  }

  const handleDescriptionChange = e => {
    const { value, checked } = e.target;
    if (checked) {
      updateState('groupDescription', value, tripActions);
    }
  }

  const handleSubmit = async e => {
    e.preventDefault();
    
    try {
      console.log('data sent to back end server to make API request');
      const response = await fetch('/api/trip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const parsedData = await response.json();
      if (response.ok) {
        updateState('itinerary', parsedData.itinerary, itineraryActions);
      } else {
        throw new Error('failed to retrieve data');
      }
    } catch (error) {
      console.error('Error with request:', error);
    }
  };
  
  return (
    <>
      <Header />
      <div className="form-container">
        <div>
          <h2>Enter in your travel details...</h2>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="destination">
                Destination:
              </label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="startDate">
                Start Date:
              </label>
              <input type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="endDate">
                End Date:
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="text-center bg-yellow-200">
              <p className='text-3xl font-semibold underline m-3'>
                Select activities you are interested in...
                </p>
              <ul className="activities">
                <li className="activity-card">
                  <label>
                    <input
                      type="checkbox"
                      value="Hiking"
                      onChange={handleActivitiesChange}
                    />
                    Hiking
                  </label>
                </li>
                <li className="activity-card flex items-center justify-center">
                  <label>
                    <input
                      type="checkbox"
                      value="local events"
                      onChange={handleActivitiesChange}
                    />
                    Local Events
                  </label>
                </li>
                <li className="activity-card">
                  <label>
                    <input
                      type="checkbox"
                      value="restaurants"
                      onChange={handleActivitiesChange}
                    />
                    Restaurants
                  </label>
                </li>
                <li className="activity-card">
                  <label>
                    <input
                      type="checkbox"
                      value="danger"
                      onChange={handleActivitiesChange}
                    />
                    Danger
                  </label>
                </li>
                <li className="activity-card">
                  <label>
                    <input
                      type="checkbox"
                      value="safety"
                      onChange={handleActivitiesChange}
                    />
                    Safety
                  </label>
                </li>
                <li className="activity-card">
                  <label>
                    <input
                      type="checkbox"
                      value="museums"
                      onChange={handleActivitiesChange}
                    />
                    Museums
                  </label>
                </li>
              </ul>
            </div>
            <div>
              <label htmlFor="budget">
                Budget:
              </label>
              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="travelers">
                No. of Travelers:
              </label>
              <input
                type="number"
                name="travelers"
                value={formData.travelers}
                onChange={handleInputChange}
              />
            </div>
            <div className="group-description-container">
              <p>What best describes your travel group...</p>
              <ul className="group-description">
                <li>
                  <label>
                    <input
                      type="radio"
                      name="groupDescription"
                      value="Solo traveler"
                      defaultChecked={true}
                      onChange={handleDescriptionChange}
                    />
                    Solo traveler
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      type="radio"
                      name="groupDescription"
                      value="Family with young kids"
                      onChange={handleDescriptionChange}
                    />
                    Family (young kids)
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      type="radio"
                      name="groupDescription"
                      value="Family of all ages"
                      onChange={handleDescriptionChange}
                    />
                    Family (all ages)
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      type="radio"
                      name="groupDescription"
                      value="Family of adults"
                      onChange={handleDescriptionChange}
                    />
                    Family (adults)
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      type="radio"
                      name="groupDescription"
                      value="Friends"
                      onChange={handleDescriptionChange}
                    />
                    Friends
                  </label>
                </li>
              </ul>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
        <div>
          <h2>Your Itinerary</h2>
          <Itinerary itinerary={itineraryData} />
        </div>
      </div>
    </>
  );
};

export default Form;