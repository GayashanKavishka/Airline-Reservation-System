import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation, Route } from "react-router-dom";
import axios from "axios";
import "./EditPage.css";

const EditPage = () => {
  const { id } = useParams(); // Get flight ID from the URL
  const navigate = useNavigate();
  const location = useLocation(); // Use location to get state
  const [flight, setFlight] = useState({
    Aircraft_ID: "",
    Route_ID: "",
    Flight_price: "",
    Expected_arrival_date_time: "",
    Departure_date_time: "",
    Created_By: "",
  });

  // If data is passed from the previous page, use it. Otherwise, fetch from API.
  useEffect(() => {
    if (location.state?.flight) {
      setFlight(location.state.flight);
      console.log(flight);
    } else {
      axios
        .get(`http://localhost:5174/schedule/${id}`)
        .then((res) => setFlight(res.data))
        .catch((err) => console.error(err));
    }
  }, [id, location.state]);

  // Handle form input change
  const handleChange = (e) => {
    setFlight({ ...flight, [e.target.name]: e.target.value });
  };

  // Handle form submission to update the flight details
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5174/schedule/${id}`, flight)
      .then((res) => {
        alert("Flight details updated successfully");
        navigate("/"); // Redirect to schedule page after successful update
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="contain2">
      <h2>Edit Flight {id}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="Aircraft_ID">Aircraft ID</label>
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
          <label htmlFor="Expected_arrival_date_time">
            Expected Arrival Time
          </label>
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
        </div>

        <button type="submit" className="btn-btn-primary1">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditPage;
