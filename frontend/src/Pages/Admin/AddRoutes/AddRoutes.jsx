import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./AddRoutes.css";

const AddRoutes = () => {
    const [departureAirport, setDepartureAirport] = useState('');
    const [arrivalAirport, setArrivalAirport] = useState('');
    const [distance, setDistance] = useState('');

    const [locationData, setLocationData] = useState([]);
    const [filteredAirports, setFilteredAirports] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5174/airport/airport/shortcodes`);
                const data = response.data; 
                setLocationData(data);
                setFilteredAirports(data); // Initialize filteredAirports
                console.log("Fetched Locations:", data);
            } catch (error) {
                console.error('Error fetching airport data:', error);
            }
        };

        fetchData();
    }, []);

    // Handle Departure Airport change
    const handleDepartureChange = (e) => {
        const selectedAirport = e.target.value;
        setDepartureAirport(selectedAirport);
        setArrivalAirport(''); // Reset arrival airport when departure changes
        
        // Filter out the selected departure airport from arrival options
        setFilteredAirports(locationData.filter(airport => airport.short_code !== selectedAirport));
    };

    // Handle Arrival Airport change
    const handleArrivalChange = (e) => {
        setArrivalAirport(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const flightData = {
            Departure_airport_ID: departureAirport,
            Arrival_airport_ID: arrivalAirport,
            Distance: distance
        };

        console.log("Submitting Flight Data:", flightData);
        
        // Post your data to the server
        axios.post('http://localhost:5174/route/addRoute', flightData)
            .then(res => {
                if (res.status === 400) {
                    alert('Error adding flight route.');
                } else {
                    alert('Flight route added successfully!');
                    navigate('/admin/routes'); 
                }
            })
            .catch(err => {
                console.error(err);
                alert('Error adding flight route');
            });
    };

    return (
        <div className="contain1">
            <h2>Add New Flight Route</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Departure Airport</label>
                    <select 
                        className="form-control"
                        value={departureAirport}
                        onChange={handleDepartureChange}
                        required
                    >
                        <option value="">Select Departure Airport</option>
                        {locationData.map((airport) => (
                            <option key={airport.short_code} value={airport.short_code}>{airport.short_code}</option>
                        ))}
                    </select>
                </div>
                
                <div className="mb-3">
                    <label className="form-label">Arrival Airport </label>
                    <select 
                        className="form-control"
                        value={arrivalAirport}
                        onChange={handleArrivalChange}
                        disabled={!departureAirport}
                        required
                    >
                        <option value="">Select Arrival Airport</option>
                        {filteredAirports.map((airport) => (
                            <option key={airport.short_code} value={airport.short_code}>{airport.short_code}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Distance (km)</label>
                    <input 
                        type="number" 
                        className="form-control"
                        value={distance}
                        onChange={(e) => setDistance(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">Add Route</button>
            </form>
        </div>
    );
};

export default AddRoutes;
