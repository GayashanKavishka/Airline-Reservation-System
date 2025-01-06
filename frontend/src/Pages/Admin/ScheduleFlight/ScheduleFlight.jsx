// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import "./ScheduleFlight.css";
// import AdminNav from '../../../components/AdminNav/AdminNav';


// const AdminScheduleFlight = () => {
//     const [schedule, setSchedule] = useState([]);

//     let navigate = useNavigate();

//     const handleEdit = (flight) => {
//         navigate(`/edit/${flight.Flight_ID}`, { state: { flight } });
//     };

//     const handleRemove = (Flight_ID) => {
//         axios.delete(`http://localhost:5174/schedule/${Flight_ID}`)
//             .then(() => setSchedule(schedule.filter((item) => item.Flight_ID !== Flight_ID)))
//             .catch(err => console.error('Error deleting schedule:', err));
//     };

//     const handleBook = (flight) => {
//         navigate(`/book/${flight.Aircraft_ID}`, { state: { seatConfiguration: flight } });
//     };

//     // Fetch flight schedule data on component mount
//     useEffect(() => {
//         axios.get('http://localhost:5174/schedule')
//             .then(res => setSchedule(res.data), console.log('Schedule data:', schedule))
//             .catch(err => console.error('Error fetching schedule data:', err));
//     }, []);




//     const scheduleDetails = schedule.map((item, index) => {
//         // Check for null values and assign 'N/A' if needed before returning JSX
//         const modifiedBy = item.Modified_BY === null ? 'N/A' : item.Modified_BY;
//         const modifiedTime = item.Modified_time === null ? 'N/A' : item.Modified_time;
    
//         return (
//             <tr key={index} className="data">
//                 <td>{item.FLight_ID}</td>
//                 <td>{item.Aircraft}</td>
//                 <td>{item.Departure_Airport}</td>
//                 <td>{item.Arrival_Airport}</td>
//                 <td>{item.Departure_date_time}</td>
//                 <td>{item.Expected_arrival_date_time}</td>
//                 <td>{item.Flight_price}</td>
//                 <td>{item.Created_BY}</td>
//                 <td>{item.Created_time}</td>
//                 <td>{modifiedBy}</td>
//                 <td>{modifiedTime}</td>
//                 <td>
//                     <button className="btn btn-success" onClick={() => handleEdit(item)}>
//                         Edit
//                     </button>
//                 </td>
//                 <td>
//                     <button className="btn btn-success" onClick={() => handleRemove(item.Flight_ID)}>
//                         Remove
//                     </button>
//                 </td>
//             </tr>
//         );
//     });
    

//     return (
//         <div>
//             <AdminNav />
//             <div className="contains">
//                 <div className="row">
//                     <div className="col-md-12">
//                         <div className="card">
//                             <div className="card-header">
//                                 <h4>Flight Schedule
//                                     <Link to="/add-schedule" className="btn btn-primary float-end">Add Schedule</Link>
//                                 </h4>
//                             </div>
//                             <div className="card-body">
//                                 <table className="table table-striped">
//                                     <thead>
//                                         <tr>
//                                             <th>Flight ID</th>
//                                             <th>Aircraft</th>
//                                             <th>Departure Airport</th>
//                                             <th>Arrival Airport</th>
//                                             <th>Departure Time</th>
//                                             <th>Arrival Time</th>
//                                             <th>Price</th>
//                                             <th>Created By</th>
//                                             <th>Created Time</th>
//                                             <th>Modified By</th>
//                                             <th>Modified Time</th>
//                                             <th>Edit</th>
//                                             <th>Remove</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {scheduleDetails}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AdminScheduleFlight;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import "./ScheduleFlight.css";
import AdminNav from '../../../components/AdminNav/AdminNav';

const AdminScheduleFlight = () => {
    const [schedule, setSchedule] = useState([]);

    let navigate = useNavigate();

    const GiveColor=(item)=>{
        if(item.Status === "delayed"){
            return <td style={{color: "yellow",fontWeight:"bold"}}>{item.Status}</td>
        }
        else if (item.Status === "canceled"){
            return <td style={{color: "red",fontWeight:"bold"}}>{item.Status}</td>
        }
        else{
            return <td style={{color: "green",fontWeight:"bold"}}>{item.Status}</td>
        }
    }

    const handleEdit = (flight) => {
        navigate(`/admin/edit-schedule/${flight.Flight_ID}`, { state: { flight } });
    };

    // const handleRemove = (Flight_ID) => {
    //     // alert('Are you sure you want to delete this schedule?');
    //     console.log('Flight_ID:', Flight_ID);
    //     axios.delete(`http://localhost:5174/schedule/delete`,
    //         { params: { id: Flight_ID } }
    //     )
    //         .then(() => setSchedule(schedule.filter((item) => item.Flight_ID !== Flight_ID)))
    //         .catch(err => console.error('Error deleting schedule:', err));
    // };

    const handleRemove = (Flight_ID) => {
        // Ask for confirmation before deleting
        const confirmDelete = window.confirm('Are you sure you want to delete this schedule?');
        if (confirmDelete) {
            axios.delete(`http://localhost:5174/schedule/delete`, { params: { id: Flight_ID } })
                .then(() => setSchedule(schedule.filter((item) => item.Flight_ID !== Flight_ID)))
                .catch(err => console.error('Error deleting schedule:', err));
        }
    };
    

    const handleBook = async (flight) => {
        try {
            const response = await axios.get(`http://localhost:5174/aircraft/${flight.Flight_ID}/seatConfig`);
            const seatConfig = response.data;
            
            // Navigate to booking page with seat config
            navigate(`/book/${flight.Aircraft_ID}`, { state: { seatConfiguration: seatConfig } });
        } catch (error) {
            console.error('Error fetching seat configuration:', error);
        }
    };

    // Fetch flight schedule data on component mount
    



    useEffect(() => {
        axios.get('http://localhost:5174/schedule')
            .then(res => {
                const fetchedFlight = res.data.map(flight => {
                    // Format the date-time fields
                    const departureDateTime = flight.Departure_date_time 
                        ? new Date(flight.Departure_date_time).toISOString().slice(0, 19).replace('T', ' ') 
                        : '';
                    const arrivalDateTime = flight.Expected_arrival_date_time 
                        ? new Date(flight.Expected_arrival_date_time).toISOString().slice(0, 19).replace('T', ' ') 
                        : '';
                    const ModifiedDateTime = flight.Modified_time
                    ? new Date(flight.Modified_time).toISOString().slice(0, 19).replace('T', ' ') 
                    : '';

                    const price = flight.Flight_price+'$';
    
                    // Return a new object with formatted date-time fields
                    return {
                        ...flight,
                        Departure_date_time: departureDateTime,
                        Expected_arrival_date_time: arrivalDateTime,
                        Modified_time: ModifiedDateTime,
                        Flight_price : price
                    };
                });
                setSchedule(fetchedFlight);
            })
            .catch(err => console.error('Error fetching schedule data:', err));
    }, []);
    

    const scheduleDetails = schedule.map((item, index) => {
        const modifiedBy = item.Modified_BY === null ? 'N/A' : item.Modified_BY;
        const modifiedTime = item.Modified_time === null ? 'N/A' : item.Modified_time;

        return (
            <tr key={index} className="data">
                <td>{item.Flight_ID}</td>
                <td>{item.Aircraft}</td>
                <td>{item.Departure_Airport}</td>
                <td>{item.Arrival_Airport}</td>
                <td>{item.Departure_date_time}</td>
                <td>{item.Expected_arrival_date_time}</td>
                <td>{item.Flight_price}</td>
                <td>{item.Created_BY}</td>
                <td>{item.Created_time}</td>
                {GiveColor(item)}
                <td>{modifiedBy}</td>
                <td>{modifiedTime}</td>
                <td>
                    <div className="dropdown">
                        <ul className="dropdown-menu" aria-labelledby={`dropdownMenuButton${index}`}>
                            <li>
                                <button
                                    className="dropdown-item"
                                    onClick={() => handleEdit(item)}
                                >
                                    Edit
                                </button>
                            </li>
                            <li>
                                <button
                                    className="dropdown-item"
                                    onClick={() => {handleRemove(item.Flight_ID) }}
                                >
                                    Remove
                                </button>
                            </li>
                        </ul>
                    </div>
                </td>
            </tr>
        );
    });

    return (
        <div>
            <AdminNav />
            <div className="contains">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Flight Schedule
                                    <Link to="/add-schedule" className="btn btn-primary float-end">Add Schedule</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Flight ID</th>
                                            <th>Aircraft</th>
                                            <th>Departure Airport</th>
                                            <th>Arrival Airport</th>
                                            <th>Departure Time</th>
                                            <th>Arrival Time</th>
                                            <th>Price</th>
                                            <th>Created By</th>
                                            <th>Created Time</th>
                                            <th>Status</th>
                                            <th>Modified By</th>
                                            <th>Modified Time</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {scheduleDetails}
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

export default AdminScheduleFlight;
