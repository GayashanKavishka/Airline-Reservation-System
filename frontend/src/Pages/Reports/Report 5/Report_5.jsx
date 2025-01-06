import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './Report_5.css';
import AdminNav from '../../../components/AdminNav/AdminNav';

const Report5 = () => {
    const [departureAirport, setDepartureAirport] = useState('');
    const [arrivalAirport, setArrivalAirport] = useState('');
    const [passenger, setPassenger] = useState([[]]);
    const [airports, setAirports] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5174/airport/airport/shortcodes`);
                setAirports(response.data);
            } catch (error) {
                console.error('Error fetching airport data:', error);
            }
        };
        fetchData();
    }, []);


    


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (departureAirport && arrivalAirport) {
            
            try {
                const response = await axios.get(`http://localhost:5174/schedule/byAirports`, {
                    params:{
                        from : departureAirport,
                        to : arrivalAirport
                    }
                });
                setPassenger(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching booking data:', error);
            }
        } else {
            alert("Please select both departure and arrival airports");
        }
    };

    // Sample data for airport options
    

    return (
        <div>
            <AdminNav />
            <div className="cont">
                <h2 className="heading">Select Departure and Arrival Airports To Get Past Flight Details</h2>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label className="label">Departure Airport:</label>
                        <select 
                            value={departureAirport} 
                            onChange={(e) => setDepartureAirport(e.target.value)} 
                            className="input"
                        >
                            <option value="">Select Airport</option>
                            {airports.map((airport) => (
                                <option key={airport.short_code} value={airport.short_code}>
                                    {airport.short_code}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="input-group">
                        <label className="label">Arrival Airport:</label>
                        <select 
                            value={arrivalAirport} 
                            onChange={(e) => setArrivalAirport(e.target.value)} 
                            className="input"
                        >
                            <option value="">Select Airport</option>
                            {airports
                                .filter((airport) => airport.short_code !== departureAirport)
                                .map((airport) => (
                                    <option key={airport.short_code} value={airport.short_code}>
                                        {airport.short_code}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <button type="submit" className="b">Submit</button>
                </form>

                {passenger.length > 0 && (
                    <table className="Table">
                        <thead>
                            <tr>
                                <th>Flight ID</th>
                                <th>Departure Airport</th>
                                <th>Arrival Airport</th>
                                <th>Passanger Count</th>
                                <th>Flight Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {passenger.map((p, index) => (
                                <tr key={index}>
                                    <td>{p.Flight_ID}</td>
                                    <td>{p.DepartureAirport}</td>
                                    <td>{p.ArrivalAirport}</td>
                                    <td>{p.PassengerCount}</td>
                                    <td>{p.FlightStatus}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Report5;
