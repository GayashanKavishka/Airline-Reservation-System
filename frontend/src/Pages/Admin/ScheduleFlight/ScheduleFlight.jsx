
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import "./ScheduleFlight.css";
// import AdminNav from '../../../components/AdminNav/AdminNav';

// const AdminScheduleFlight = () => {
//     const [schedule, setSchedule] = useState([]);

//     let navigate = useNavigate();

//     const GiveColor = (item) => {
//         if (item.Status === "delayed") {
//             return <td className="text-yellow-500 font-semibold">{item.Status}</td>
//         }
//         else if (item.Status === "canceled") {
//             return <td className="text-red-500 font-semibold">{item.Status}</td>
//         }
//         else {
//             return <td className="text-green-500 font-semibold">{item.Status}</td>
//         }
//     }

//     const handleEdit = (flight) => {
//         navigate(`/admin/edit-schedule/${flight.Flight_ID}`, { state: { flight } });
//     };

//     const handleRemove = (Flight_ID) => {
//         const confirmDelete = window.confirm('Are you sure you want to delete this schedule?');
//         if (confirmDelete) {
//             axios.delete(`http://localhost:5174/schedule/delete`, { params: { id: Flight_ID } })
//                 .then(() => setSchedule(schedule.filter((item) => item.Flight_ID !== Flight_ID)))
//                 .catch(err => console.error('Error deleting schedule:', err));
//         }
//     };

//     const handleBook = async (flight) => {
//         try {
//             const response = await axios.get(`http://localhost:5174/aircraft/${flight.Flight_ID}/seatConfig`);
//             const seatConfig = response.data;

//             navigate(`/book/${flight.Aircraft_ID}`, { state: { seatConfiguration: seatConfig } });
//         } catch (error) {
//             console.error('Error fetching seat configuration:', error);
//         }
//     };

//     useEffect(() => {
//         axios.get('http://localhost:5174/schedule')
//             .then(res => {
//                 const fetchedFlight = res.data.map(flight => {
//                     const departureDateTime = flight.Departure_date_time
//                         ? new Date(flight.Departure_date_time).toISOString().slice(0, 19).replace('T', ' ')
//                         : '';
//                     const arrivalDateTime = flight.Expected_arrival_date_time
//                         ? new Date(flight.Expected_arrival_date_time).toISOString().slice(0, 19).replace('T', ' ')
//                         : '';
//                     const ModifiedDateTime = flight.Modified_time
//                         ? new Date(flight.Modified_time).toISOString().slice(0, 19).replace('T', ' ')
//                         : '';

//                     const price = flight.Flight_price + '$';

//                     return {
//                         ...flight,
//                         Departure_date_time: departureDateTime,
//                         Expected_arrival_date_time: arrivalDateTime,
//                         Modified_time: ModifiedDateTime,
//                         Flight_price: price
//                     };
//                 });
//                 setSchedule(fetchedFlight);
//             })
//             .catch(err => console.error('Error fetching schedule data:', err));
//     }, []);

//     const scheduleDetails = schedule.map((item, index) => {
//         const modifiedBy = item.Modified_BY === null ? 'N/A' : item.Modified_BY;
//         const modifiedTime = item.Modified_time === null ? 'N/A' : item.Modified_time;

//         return (
//             <tr key={index} className="text-white">
//                 <td>{item.Flight_ID}</td>
//                 <td>{item.Aircraft}</td>
//                 <td>{item.Departure_Airport}</td>
//                 <td>{item.Arrival_Airport}</td>
//                 <td>{item.Departure_date_time}</td>
//                 <td>{item.Expected_arrival_date_time}</td>
//                 <td>{item.Flight_price}</td>
//                 <td>{item.Created_BY}</td>
//                 <td>{item.Created_time}</td>
//                 {GiveColor(item)}
//                 <td>{modifiedBy}</td>
//                 <td>{modifiedTime}</td>
//                 <td>
//                     <div className="relative">
//                                 <button
//                                     className="block px-4 py-2 text-sm hover:bg-gray-700"
//                                     onClick={() => handleEdit(item)}
//                                 >
//                                     Edit
//                                 </button>
//                                 <button
//                                     className="block px-4 py-2 text-sm hover:bg-gray-700"
//                                     onClick={() => handleRemove(item.Flight_ID)}
//                                 >
//                                     Remove
//                                 </button>
//                     </div>
//                 </td>
//             </tr>
//         );
//     });

//     return (
//         <div className="bg-black text-white min-h-screen">
//     <AdminNav />
//     <div className="container mx-auto px-4 py-8">
//         <div className="bg-gray-800 rounded-lg shadow-lg">
//             <div className="flex justify-between items-center p-4 border-b border-gray-700">
//                 <h4 className="text-xl font-semibold">Flight Schedule</h4>
//                 <Link
//                     to="/add-schedule"
//                     className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
//                 >
//                     Add Schedule
//                 </Link>
//             </div>
//             <div className="overflow-x-auto">
//                 <table className="table-auto w-full border-collapse border border-gray-700">
//                     <thead>
//                         <tr className="bg-gray-700 text-left text-white">
//                             <th className="px-4 py-2 border border-gray-700">Flight ID</th>
//                             <th className="px-4 py-2 border border-gray-700">Aircraft</th>
//                             <th className="px-4 py-2 border border-gray-700">Departure Airport</th>
//                             <th className="px-4 py-2 border border-gray-700">Arrival Airport</th>
//                             <th className="px-4 py-2 border border-gray-700">Departure Time</th>
//                             <th className="px-4 py-2 border border-gray-700">Arrival Time</th>
//                             <th className="px-4 py-2 border border-gray-700">Price</th>
//                             <th className="px-4 py-2 border border-gray-700">Created By</th>
//                             <th className="px-4 py-2 border border-gray-700">Created Time</th>
//                             <th className="px-4 py-2 border border-gray-700">Status</th>
//                             <th className="px-4 py-2 border border-gray-700">Modified By</th>
//                             <th className="px-4 py-2 border border-gray-700">Modified Time</th>
//                             <th className="px-4 py-2 border border-gray-700">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {scheduleDetails}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     </div>
// </div>

//     );
// };

// export default AdminScheduleFlight;



import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import AdminNav from "../../../components/AdminNav/AdminNav";

const AdminScheduleFlight = () => {
    const [schedule, setSchedule] = useState([]);
    const navigate = useNavigate();

    const GiveColor = (item) => {
        if (item.Status === "delayed") {
            return <td className="text-yellow-500 font-semibold border border-gray-700">{item.Status}</td>;
        } else if (item.Status === "canceled") {
            return <td className="text-red-500 font-semibold border border-gray-700">{item.Status}</td>;
        } else {
            return <td className="text-green-500 font-semibold border border-gray-700">{item.Status}</td>;
        }
    };

    const handleEdit = (flight) => {
        navigate(`/admin/edit-schedule/${flight.Flight_ID}`, { state: { flight } });
    };

    const handleRemove = (Flight_ID) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this schedule?");
        if (confirmDelete) {
            axios
                .delete(`http://localhost:5174/schedule/delete`, { params: { id: Flight_ID } })
                .then(() => setSchedule(schedule.filter((item) => item.Flight_ID !== Flight_ID)))
                .catch((err) => console.error("Error deleting schedule:", err));
        }
    };

    useEffect(() => {
        axios
            .get("http://localhost:5174/schedule")
            .then((res) => {
                const fetchedFlight = res.data.map((flight) => {
                    const departureDateTime = flight.Departure_date_time
                        ? new Date(flight.Departure_date_time).toISOString().slice(0, 19).replace("T", " ")
                        : "";
                    const arrivalDateTime = flight.Expected_arrival_date_time
                        ? new Date(flight.Expected_arrival_date_time).toISOString().slice(0, 19).replace("T", " ")
                        : "";
                    const ModifiedDateTime = flight.Modified_time
                        ? new Date(flight.Modified_time).toISOString().slice(0, 19).replace("T", " ")
                        : "";

                    const price = flight.Flight_price + "$";

                    return {
                        ...flight,
                        Departure_date_time: departureDateTime,
                        Expected_arrival_date_time: arrivalDateTime,
                        Modified_time: ModifiedDateTime,
                        Flight_price: price,
                    };
                });
                setSchedule(fetchedFlight);
            })
            .catch((err) => console.error("Error fetching schedule data:", err));
    }, []);

    const scheduleDetails = schedule.map((item, index) => {
        const modifiedBy = item.Modified_BY === null ? "N/A" : item.Modified_BY;
        const modifiedTime = item.Modified_time === null ? "N/A" : item.Modified_time;

        return (
            <tr key={index} className="even:bg-gray-800 odd:bg-gray-700 text-white border-t border-gray-600">
                <td className="px-4 py-2 border border-gray-700">{item.Flight_ID}</td>
                <td className="px-4 py-2 border border-gray-700">{item.Aircraft}</td>
                <td className="px-4 py-2 border border-gray-700">{item.Departure_Airport}</td>
                <td className="px-4 py-2 border border-gray-700">{item.Arrival_Airport}</td>
                <td className="px-4 py-2 border border-gray-700">{item.Departure_date_time}</td>
                <td className="px-4 py-2 border border-gray-700">{item.Expected_arrival_date_time}</td>
                <td className="px-4 py-2 border border-gray-700">{item.Flight_price}</td>
                <td className="px-4 py-2 border border-gray-700">{item.Created_BY}</td>
                <td className="px-4 py-2 border border-gray-700">{item.Created_time}</td>
                {GiveColor(item)}
                <td className="px-4 py-2 border border-gray-700">{modifiedBy}</td>
                <td className="px-4 py-2 border border-gray-700">{modifiedTime}</td>
                <td className="px-4 py-2 border border-gray-700">
                    <div className="flex space-x-2">
                        <button
                            onClick={() => handleEdit(item)}
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleRemove(item.Flight_ID)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                        >
                            Delete
                        </button>
                    </div>
                </td>
            </tr>
        );
    });

    return (
        <div className="bg-black text-white min-h-screen">
            <AdminNav />
            <div className="container mx-auto px-4 py-8">
                <div className="bg-gray-800 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center p-4 border-b border-gray-700">
                        <h4 className="text-xl font-semibold">Flight Schedule</h4>
                        <Link
                            to="/add-schedule"
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                        >
                            Add Schedule
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full border-collapse border border-gray-700">
                            <thead>
                                <tr className="bg-gray-700 text-left text-white">
                                    <th className="px-4 py-2 border border-gray-700">Flight ID</th>
                                    <th className="px-4 py-2 border border-gray-700">Aircraft</th>
                                    <th className="px-4 py-2 border border-gray-700">Departure Airport</th>
                                    <th className="px-4 py-2 border border-gray-700">Arrival Airport</th>
                                    <th className="px-4 py-2 border border-gray-700">Departure Time</th>
                                    <th className="px-4 py-2 border border-gray-700">Arrival Time</th>
                                    <th className="px-4 py-2 border border-gray-700">Price</th>
                                    <th className="px-4 py-2 border border-gray-700">Created By</th>
                                    <th className="px-4 py-2 border border-gray-700">Created Time</th>
                                    <th className="px-4 py-2 border border-gray-700">Status</th>
                                    <th className="px-4 py-2 border border-gray-700">Modified By</th>
                                    <th className="px-4 py-2 border border-gray-700">Modified Time</th>
                                    <th className="px-4 py-2 border border-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody>{scheduleDetails}</tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminScheduleFlight;

