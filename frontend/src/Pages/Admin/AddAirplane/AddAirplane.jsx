import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./AddAirplane.css"


const AddAirplane = () => {
    const [formData, setFormData] = useState({
        Aircraft_ID: '',
        Model_name: '',
    });

    const navigate = useNavigate();

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };``

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5174/aircraft', formData)
            .then(res => {
                if(res.status === 400){
                    alert('Model name not found in the models table.');
                }
                else
                {
                alert('Craft added successfully!');
                navigate('/admin/airplane');
                } // Redirect to schedule list page after successful addition
            })
            .catch(err => {
                console.error(err);
                alert('Error adding Aircraft');
            });
    };

    return (
        <div className="contain1">
            <h2>Add New Aircraft</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Aircraft ID</label>
                    <input 
                        type="text" 
                        className="form-control"
                        name="Aircraft_ID"
                        value={formData.Aircraft_ID}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Model_name</label>
                    <input 
                        type="text" 
                        className="form-control"
                        name="Model_name"
                        value={formData.Model_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                {/* <div className="mb-3">
                    <label className="form-label">Flight Price</label>
                    <input 
                        type="number" 
                        className="form-control"
                        name="Flight_price"
                        value={formData.Flight_price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Expected Arrival Date/Time</label>
                    <input 
                        type="datetime-local" 
                        className="form-control"
                        name="Expected_arrival_date_time"
                        value={formData.Expected_arrival_date_time}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Departure Date/Time</label>
                    <input 
                        type="datetime-local" 
                        className="form-control"
                        name="Departure_date_time"
                        value={formData.Departure_date_time}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Created By</label>
                    <input 
                        type="text" 
                        className="form-control"
                        name="Created_By"
                        value={formData.Created_By}
                        onChange={handleChange}
                        required
                    />
                </div> */}
                <button type="submit" className="btn-btn-primary">Add Aircraft</button>
            </form>
        </div>
    );
};

export default AddAirplane;
