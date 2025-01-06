import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Route } from 'react-router-dom';
import axios from 'axios';
import "./EditSchedule.css";

const EditSchedule = () => {
    const { id } = useParams(); // Get flight ID from the URL
    const navigate = useNavigate();
    const location = useLocation(); // Use location to get state
    // const [flight, setFlight] = useState({
    //     FLight_ID: "",
    //     Aircraft: "",
    //     Departure_Airport: "",
    //     Arrival_Airport: "",
    //     Departure_date_time: "",
    //     Expected_arrival_date_time: "",
    //     Flight_price: "",
    //     Created_BY: "",
    //     Created_time: "",
    //     Modified_BY: "",
    //     Modified_time: ""
    // });
    const [flight, setFlight] = useState({});

    // If data is passed from the previous page, use it. Otherwise, fetch from API.
    // useEffect(() => {
    //         axios.get(`http://localhost:5174/schedule/byID`,
    //             { params: { id: id } }
    //         )
    //             .then(res => {
    //                 setFlight(res.data);
    //                 console.log(flight);
                    
    //             })
    //             .catch(err => console.error(err));
        
    // }, [id, location.state]);


    useEffect(() => {
        axios.get(`http://localhost:5174/schedule/modify/id`, { params: { id: id } })
            .then(res => {
                const fetchedFlight = res.data;
    
                // Format date-time fields for the datetime-local input
                fetchedFlight.Departure_date_time = fetchedFlight.Departure_date_time
                    ? fetchedFlight.Departure_date_time.slice(0, 16)
                    : '';
                fetchedFlight.Expected_arrival_date_time = fetchedFlight.Expected_arrival_date_time
                    ? fetchedFlight.Expected_arrival_date_time.slice(0, 16)
                    : '';
    
                setFlight(fetchedFlight);
                console.log(res.data);
                console.log(flight);
            })
            .catch(err => console.error(err));
    }, [id, location.state]);


    

    // Handle form input change
    const handleChange = (e) => {
        setFlight({ ...flight, [e.target.name]: e.target.value });
    };

    // Handle form submission to update the flight details
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(flight);
        axios.put(`http://localhost:5174/schedule/update`, flight)
            .then(res => {
                alert('Flight details updated successfully');
                navigate('/admin/add-schedule'); // Redirect to schedule page after successful update
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="contain2">
            <h2>Edit Flight {id}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="Aircraft_ID">Aircraft ID </label>
                    <input
                        type="text"
                        className="form-control"
                        id="Aircraft_ID"
                        name="Aircraft_ID"
                        value={flight.Aircraft_ID}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="Route_ID">Route ID</label>
                    <input
                        type="text"
                        className="form-control"
                        id="Route_ID"
                        name="Route_ID"
                        value={flight.Route_ID}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="Flight_price">Flight Price</label>
                    <input
                        type="text"
                        className="form-control"
                        id="Flight_price"
                        name="Flight_price"
                        value={flight.Flight_price}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
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
                    <label htmlFor="Departure_date_time">Status</label>
                    <select
                        className="form-control"
                        name="Status"
                        value={flight.Status || ""}
                        onChange={handleChange}
                        style={{ width: '230px' }}
                    >
                        <option value="Delayed">delayed</option>
                        <option value="Cancelled">cancelled</option>
                        <option value="on-time">on-Time</option>
                    </select>
                </div>



                <div className="form-group">
                    <label htmlFor="Created_By">Modified By</label>
                    <input
                        type="text"
                        className="form-control"
                        id="Modified_by"
                        name="Modified_by"
                        value={flight.Modified_by}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className="btn-btn-primary1">Save Changes</button>
            </form>
        </div>
    );
};

export default EditSchedule;
