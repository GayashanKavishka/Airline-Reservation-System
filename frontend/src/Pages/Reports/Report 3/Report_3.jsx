import React, { useState } from 'react';
import axios from 'axios';
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
            alert('Please select both start and end date');
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <AdminNav />
            <div className="container mx-auto py-8 px-4">
                <h2 className="text-3xl font-semibold text-center text-purple-300 mb-8">
                    Passenger Count For Given Time Period and Destination
                </h2>
                <form
                    className="bg-gray-800 shadow-lg rounded-lg p-6 flex items-center justify-between space-x-4"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col w-1/4">
                        <label className="mb-2 text-purple-400 font-medium">Short Code of the Airport</label>
                        <input
                            type="text"
                            value={short_code}
                            onChange={(e) => setShortCode(e.target.value)}
                            className="bg-gray-700 text-white px-4 py-2 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        />
                    </div>
                    <div className="flex flex-col w-1/4">
                        <label className="mb-2 text-purple-400 font-medium">Start Date</label>
                        <input
                            type="date"
                            value={start_date}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="bg-gray-700 text-white px-4 py-2 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        />
                    </div>
                    <div className="flex flex-col w-1/4">
                        <label className="mb-2 text-purple-400 font-medium">End Date</label>
                        <input
                            type="date"
                            value={end_date}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="bg-gray-700 text-white px-4 py-2 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-md transition duration-200"
                    >
                        Submit
                    </button>
                </form>

                {airports.length > 0 && (
                    <div className="mt-8 overflow-x-auto">
                        <table className="w-full bg-gray-800 text-white shadow-lg rounded-lg">
                            <thead className="bg-purple-600">
                                <tr>
                                    <th className="px-4 py-2 text-left">Name of the Airport</th>
                                    <th className="px-4 py-2 text-left">Passenger Count</th>
                                </tr>
                            </thead>
                            <tbody>
                                {airports.map((airport, index) => (
                                    <tr
                                        key={index}
                                        className={`${
                                            index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-800'
                                        } hover:bg-gray-600`}
                                    >
                                        <td className="px-4 py-2">{airport.Name}</td>
                                        <td className="px-4 py-2">{airport.PassengerCount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Report3;
