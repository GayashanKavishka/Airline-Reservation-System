import React, { useState } from 'react';
import axios from 'axios';
import './Report_2.css';
import AdminNav from '../../../components/AdminNav/AdminNav';

const Report2 = () => {
    const [flightID, setFlightID] = useState('');
    const [Passanger, setPassanger] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (flightID) {
            try {
                const response = await axios.get(`http://localhost:5174/user/admin/report2`, {
                    params: { flightID }
                });
                setPassanger(response.data);
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
            <h2 className="heading"> Select The Age Group for Flight</h2>
            <form className="form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label className="label">Flight_ID:</label>
                    <input 
                        type="text" 
                        value={flightID} 
                        onChange={(e) => setFlightID(e.target.value)} 
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

            {Passanger.length > 0 && (
                <table className="Table">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Second Name</th>
                            <th>Age Group</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Passanger.map((passanger, index) => (
                            <tr key={index}>
                                <td>{passanger.FirstName}</td>
                                <td>{passanger.SecondName}</td>
                                <td>{passanger.AgeGroup}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
        </div>
    );
};

export default Report2;
