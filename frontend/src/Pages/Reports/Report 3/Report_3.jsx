import React, { useState } from 'react';
import axios from 'axios';
import './Report_3.css';
import AdminNav from '../../../components/AdminNav/AdminNav';

const Report3 = () => {
    const [short_code, setShortCode] = useState('');
    const [start_date, setStartDate] = useState('');
    const [end_date, setEndDate] = useState('');
    const [airports, setAirports] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (short_code && start_date && end_date) {
            try {
                const response = await axios.get(`http://localhost:5174/user/admin/report3`, {
                    params: { short_code, start_date, end_date }
                });
                setAirports(response.data);
            } catch (error) {
                console.error('Error fetching booking data:', error);
            }
        } else {
            alert("Please select both start and end date");
        }
    };

    return (
        <div>
            <AdminNav/>
        <div className="cont">
            <h2 className="heading"> Passanger Count For Given Time period and Destination</h2>
            <form className="form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label className="label">Short Code of the Airport</label>
                    <input 
                        type="text" 
                        value={short_code} 
                        onChange={(e) => setShortCode(e.target.value)} 
                        className="input"
                    />
                </div>
                <div className="input-group">
                    <label className="label">Start Date</label>
                    <input 
                        type="date" 
                        value={start_date} 
                        onChange={(e) => setStartDate(e.target.value)} 
                        className="input"
                    />
                </div>
                <div className="input-group">
                    <label className="label">End Date</label>
                    <input 
                        type="date" 
                        value={end_date} 
                        onChange={(e) => setEndDate(e.target.value)} 
                        className="input"
                    />
                </div>
                {/* <div className="input-group">
                    <label className="label">End Date:</label>
                    <input 
                        type="date" 
                        value={end_date} 
                        onChange={(e) => setEndDate(e.target.value)} 
                        className="input"
                    />
                </div> */}
                <button type="submit" className="b">Submit</button>
            </form>

            {airports.length > 0 && (
                <table className="Table">
                    <thead>
                        <tr>
                            <th>Name of the Airport</th>
                            <th>Passanger Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {airports.map((airport, index) => (
                            <tr key={index}>
                                <td>{airport.Name}</td>
                                <td>{airport.PassengerCount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
        </div>
    );
};

export default Report3;
