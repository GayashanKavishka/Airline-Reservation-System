import React, { useState } from 'react';
import axios from 'axios';
import './Report_1.css';
import AdminNav from '../../../components/AdminNav/AdminNav';

const Report1 = () => {
    const [start_date, setStartDate] = useState('');
    const [end_date, setEndDate] = useState('');
    const [bookings, setBookings] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (start_date && end_date) {
            try {
                const response = await axios.get(`http://localhost:5174/rewards/admin/report1`, {
                    params: { start_date, end_date }
                });
                setBookings(response.data);
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
            <h2 className="heading">Number of Bookings For Each Class</h2>
            <form className="form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label className="label">Start Date:</label>
                    <input 
                        type="date" 
                        value={start_date} 
                        onChange={(e) => setStartDate(e.target.value)} 
                        className="input"
                    />
                </div>
                <div className="input-group">
                    <label className="label">End Date:</label>
                    <input 
                        type="date" 
                        value={end_date} 
                        onChange={(e) => setEndDate(e.target.value)} 
                        className="input"
                    />
                </div>
                <button type="submit" className="b">Submit</button>
            </form>

            {bookings.length > 0 && (
                <table className="Table">
                    <thead>
                        <tr>
                            <th>Reward Class</th>
                            <th>Number Of Bookings</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking, index) => (
                            <tr key={index}>
                                <td>{booking.Reward_class}</td>
                                <td>{booking.NumberOfBookings}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
        </div>
    );
};

export default Report1;
