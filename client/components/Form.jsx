import React, { useState } from 'react';
import Header from './Header';

const Form = () => {
    const [formData, setFormData] = useState({
        destination: '',
        startDate: '',
        endDate: '',
        activities: [],
        budget: 0,
        travelers: 0,
        groupDescription: ''
    })
    
    const handleInputChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }
    
    const handleActivitiesChange = e => {
        const { value, checked } = e.target;
        setFormData(prev => {
            let updatedActivities = [...prev.activities];
            if (checked) {
                updatedActivities.push(value)
            } else {
                updatedActivities = updatedActivities.filter(activity => activity !== value); // Remove the unselected activity from the updated array
            }
            return {
                ...prev,
                activities: updatedActivities // Update the activities property with the updated array
            };
        })
    }

    const handleDescriptionChange = e => {
        const { value, checked } = e.target;
        if (checked) {
            setFormData(prev => ({
                ...prev,
                groupDescription: value
            }))
        }
    }

    const handleSubmit = async e => {
        e.preventDefault();
        console.log(JSON.stringify(formData))

        /////////////// To send formData to back end to make API request ///////////////
        
        try {
            const response = await fetch('/api/itinerary', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(formData)
            });
            console.log('data sent to back end server to make API request')
            if (response.ok) {
              console.log(response)
            } else {
              throw new Error('failed to retreive data');
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
                        <label htmlFor="destination">Destination:</label>
                        <input type="text" name="destination" placeholder="Las Vegas, NV" value={formData.destination} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label htmlFor="startDate">Start Date:</label>
                        <input type="date" name="startDate" placeholder="04/13/24" value={formData.startDate} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label htmlFor="endDate">End Date:</label>
                        <input type="date" name="endDate" placeholder="04/20/24" value={formData.endDate} onChange={handleInputChange} />
                    </div>
                    <div className="activites-container"> 
                        <p>Select activites you are interested in...</p>
                        <ul className="activities"> 
                            <li> 
                                <label> 
                                    <input 
                                        type="checkbox" 
                                        value="Hiking"
                                        onChange={handleActivitiesChange}
                                    />
                                    Hiking
                                </label> 
                            </li> 
                            <li> 
                                <label> 
                                    <input 
                                        type="checkbox" 
                                        value="local events"
                                        onChange={handleActivitiesChange}
                                    /> 
                                    Local Events 
                                </label> 
                            </li> 
                            <li> 
                                <label> 
                                    <input 
                                        type="checkbox" 
                                        value="restaurants"
                                        onChange={handleActivitiesChange}
                                    /> 
                                    Restaurants 
                                </label>
                            </li>
                            <li> 
                                <label> 
                                    <input 
                                        type="checkbox" 
                                        value="danger"
                                        onChange={handleActivitiesChange}
                                    /> 
                                    Danger 
                                </label> 
                            </li>
                            <li> 
                                <label> 
                                    <input 
                                        type="checkbox" 
                                        value="safety"
                                        onChange={handleActivitiesChange}
                                    /> 
                                    Safety 
                                </label> 
                            </li>
                            <li> 
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
                        <label htmlFor="budget">Budget:</label>
                        <input type="number" name="budget" placeholder="1500" value={formData.budget} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label htmlFor="travelers">No. of Travelers:</label>
                        <input type="number" name="travelers" placeholder="1" value={formData.travelers} onChange={handleInputChange} />
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
        </div>
    </>
  )
}

export default Form;