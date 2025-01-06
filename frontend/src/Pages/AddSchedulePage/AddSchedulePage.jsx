import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./AddSchedulePage.css"
import AdminNav from '../../components/AdminNav/AdminNav';


const AddSchedulePage = () => {
    const [formData, setFormData] = useState({
        Flight_ID: '',
        Aircraft_ID: '',
        Route_ID: '',
        Flight_price: '',
        Expected_arrival_date_time: '',
        Departure_date_time: '',
        Created_By: '',
        Status :''
    });

    const navigate = useNavigate();

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5174/schedule', formData)
            .then(res => {
                alert('Schedule added successfully!');
                navigate('/admin/add-schedule'); // Redirect to schedule list page after successful addition
            })
            .catch(err => {
                console.error(err);
                alert('Error adding schedule');
            });
    };

    return (
        <div>
            <AdminNav/>
            <div className="contain1">
                <h2>Add New Schedule</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Aircraft_ID</label>
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
                        <label className="form-label">Route_ID</label>
                        <input 
                            type="text" 
                            className="form-control"
                            name="Route_ID"
                            value={formData.Route_ID}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
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
                        <label className="form-label">Status</label>
                        <select 
                            className="form-control"
                            name="Status"
                            value={formData.Status}
                            onChange={handleChange}
                            required
                            style={{width: '230px'}}
                        >
                            <option value="">Select Status</option>
                            <option value="on-time">On-time</option>
                            <option value="delayed">Delayed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
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
                    </div>
                    <button type="submit" className="btn btn-primary">Add Schedule</button>
                </form>
            </div>
        </div>
    );
};

export default AddSchedulePage;
