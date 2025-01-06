import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import "./SchedulePage.css";
import Navbar from '../../components/Navbar/Navbar';

const Schedule = ({ isAdmin }) => {
    const [schedule, setSchedule] = useState([]);
    let navigate = useNavigate();

    // Fetch flight schedule data on component mount
    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const response = await axios.get('http://localhost:5174/schedule');
                console.log(response);
                setSchedule(response.data);
            } catch (error) {
                console.error('Error fetching schedule data:', error);
            }
        };

        fetchSchedule();
    }, []);

    const handleBook = async (flight) => {
        try {
            const response = await axios.get(`http://localhost:5174/schedule/${flight.Flight_ID}`);
            const { EconomyClassSeatCount, BusinessClassSeatCount, PlatinumClassSeatCount } = response.data;
            const seatCounts = { EconomyClassSeatCount, BusinessClassSeatCount, PlatinumClassSeatCount };
            console.log(response); // This should return the seat counts
            
            // Navigate to the booking page and pass the seat configuration
            navigate(`/book/${flight.Flight_ID}`, { state: { seatCounts } });
        } catch (error) {
            console.error('Error fetching seat counts:', error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className='h-24'></div>
            <div className="contain">
                <div className="row">
                    <div className="col-md-12">
                        <div className='card'>
                            <div className="card-header">
                                <h4>Flight Schedule
                                    <Link to="/add-schedule" className="btn btn-primary float-end">Add Schedule</Link>
                                </h4>
                            </div>
                            <div className='card-body'>
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Flight ID</th>
                                            <th>Route ID</th>
                                            <th>Aircraft ID</th>
                                            <th>Departure Time</th>
                                            <th>Expected Arrival Time</th>
                                            <th>Price</th>
                                            <th>Created By</th>
                                            <th>Created Time</th>
                                            <th>Modified By</th>
                                            <th>Modified Time</th>
                                            <th>Book</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {schedule.map((item, index) => (
                                            <tr key={index} className='data'>
                                                <td>{item.Flight_ID}</td>
                                                <td>{item.Route_ID}</td>
                                                <td>{item.Aircraft}</td>
                                                <td>{new Date(item.Departure_date_time).toLocaleString()}</td>
                                                <td>{new Date(item.Expected_arrival_date_time).toLocaleString()}</td>
                                                <td>{item.Flight_price}</td>
                                                <td>{item.Created_BY}</td>
                                                <td>{new Date(item.Created_time).toLocaleString()}</td>
                                                <td>{item.Modified_BY ? new Date(item.Modified_BY).toLocaleString() : 'N/A'}</td>
                                                <td>{item.Modified_time ? new Date(item.Modified_time).toLocaleString() : 'N/A'}</td>
                                                <td>
                                                    <button 
                                                        className="btn btn-success" 
                                                        onClick={() => handleBook(item)}
                                                    >
                                                        Book
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Schedule;
