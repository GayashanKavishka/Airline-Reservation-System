import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./AddModel.css"


const AddModel = () => {
    const [formData, setFormData] = useState({
        Model_name: '',
        Economy_seats: '',
        Bussiness_seats: '',
        Platinum_seats: '',
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
        axios.post('http://localhost:5174/models', formData)
            .then(res => {
                if(res.status === 400){
                    alert('Model name not found in the models table.');
                }
                else
                {
                alert('Model added successfully!');
                navigate('/admin/model');
                } // Redirect to schedule list page after successful addition
            })
            .catch(err => {
                console.error(err);
                alert('Error adding Aircraft');
            });
    };

    return (
        <div className="contain1">
            <h2>Add New Model</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Model name</label>
                    <input 
                        type="text" 
                        className="form-control"
                        name="Model_name"
                        value={formData.Model_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Economy seat count</label>
                    <input 
                        type="text" 
                        className="form-control"
                        name="Economy_seats"
                        value={formData.Economy_seats}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Bussiness seat count</label>
                    <input 
                        type="text" 
                        className="form-control"
                        name="Bussiness_seats"
                        value={formData.Bussiness_seats}
                        onChange={handleChange}
                        required
                    />
                </div><div className="mb-3">
                    <label className="form-label">Platinum seat count</label>
                    <input 
                        type="text" 
                        className="form-control"
                        name="Platinum_seats"
                        value={formData.Platinum_seats}
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
                <button type="submit" className="btn-btn-primary">Add Model</button>
            </form>
        </div>
    );
};

export default AddModel;
