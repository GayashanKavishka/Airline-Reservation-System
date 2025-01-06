import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import "./EditAirplane.css";

const EditAirplane = () => {
    const { id } = useParams(); // Get Aircraft ID from the URL
    const navigate = useNavigate();
    const location = useLocation(); // Use location to get state
    const [plane, setPlane] = useState({
        Model_name: '',
       
    });

    // If data is passed from the previous page, use it. Otherwise, fetch from API.
    useEffect(() => {

        if (location.state?.plane) {
            setPlane(location.state.plane);
        } else {
            axios.get(`http://localhost:5174/aircraft/${id}`)
                .then(res => setPlane(res.data))
                .catch(err => console.error(err));
        }
    }, [id, location.state]);

    // Handle form input change
    const handleChange = (e) => {
        setPlane({ ...plane, [e.target.name]: e.target.value });
    };

    // Handle form submission to update the flight details
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5174/aircraft/${id}`, plane)
            .then(res => {
                alert('Flight details updated successfully');
                navigate('/admin/airplane'); // Redirect to schedule page after successful update
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="contain2">
            <h2>Edit Aircraft {id}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="Model_name">Model Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="Model_name"
                        name="Model_name"
                        value={plane.Model_name}
                        onChange={handleChange}
                    />
                </div>

                {/* <div className="form-group">
                    <label htmlFor="Flight_price">Flight Price</label>
                    <input
                        type="text"
                        className="form-control"
                        id="Flight_price"
                        name="Flight_price"
                        value={flight.Flight_price}
                        onChange={handleChange}
                    />
                </div> */}

                {/* <div className="form-group">
                    <label htmlFor="Expected_arrival_date_time">Expected Arrival Time</label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        id="Expected_arrival_date_time"
                        name="Expected_arrival_date_time"
                        value={flight.Expected_arrival_date_time}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="Departure_date_time">Departure Time</label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        id="Departure_date_time"
                        name="Departure_date_time"
                        value={flight.Departure_date_time}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="Created_By">Created By</label>
                    <input
                        type="text"
                        className="form-control"
                        id="Created_By"
                        name="Created_By"
                        value={flight.Created_By}
                        onChange={handleChange}
                    />
                </div> */}

                <button type="submit" className="btn-btn-primary1">Save Changes</button>
            </form>
        </div>
    );
};

export default EditAirplane;
