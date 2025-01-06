import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import "./Airports.css"
// import EditPage from '../EditPage/EditPage';
import AdminNav from '../../../components/AdminNav/AdminNav';

const Airports = ({ isAdmin }) => {
    const [flights, setFlights] = useState([]);
    const [editable, setEditable] = useState(null);
    const [airports, setAirports] = useState([]);

    let navigate = useNavigate();

    // const handleEdit = (id) => {
    //     navigate(`/edit/${id}`); // direct to the edit page with flight ID
    // };


    const handleEdit = (plane) => {
        // Pass the entire flight data to the edit page
        navigate(`/admin/edit-airplane/${airports.Airport_ID}`, { state: {airports } });
    };

    const handleAddSchedule = () => {
        navigate('/add-schedule'); // direct to the add schedule page
    };
     
    const handleBook = async (aircraft_Id) => {
        try {
            const response = await axios.get(`http://localhost:5174/aircraft/${aircraft_Id}`);
            const seatConfiguration = response.data; // This will contain economy, business, platinum seat counts
    
            // Pass state correctly
            navigate('/book', { state: { seatConfiguration } }); // Make sure to use `state` object
        } catch (error) {
            console.error('Error fetching seat configuration', error);
        }
    };


    const handleRemove = (Airport_ID) => {
         axios.delete(`http://localhost:5174/aircraft/${Airport_ID}`);
            setAirports(airports.filter((item) => item.Aircraft_ID !== Aircraft_ID));
    };



    
      

    // Fetch flight schedule data on component mount
    useEffect(() => {
        axios.get('http://localhost:5174/airport/airport/all').then(res => {
            console.log(res);
            setAirports(res.data);
        })

    }, []);

    var airportsDetails = "";
    airportsDetails = airports.map((item, index) => {
        return (
            <tr key = {index} className='data'>
                <td>{item.Airport_ID}</td>
                <td>{item.Short_code}</td>
                <td>{item.Name}</td>
                <td>{item.Country}</td>
                <td>{item.State}</td>
                <td>{item.City}</td>
                <td>
                    <button 
                    className="btn btn-success" 
                    onClick={() => handleRemove(item.Airport_ID)} // Pass Aircraft_ID to handleBook
                    >
                    Remove
                    </button>
                </td>
                <td>
                    <button 
                        className="btn btn-success" 
                        onClick={() => handleEdit(item)} // Use item.Flight_ID for navigation
                    >
                        Edit
                    </button>
                </td>
            </tr>
        )
    });


    return (
        <div>
            {/* <h1>Flight Schedule</h1> */}
            <AdminNav />
            <div className ="contain">
                <div className = "row">
                    <div className = "col-md-12">
                        <div className='card'>
                            <div className = "card-header">
                                <h4>Airports
                                    <Link to="/admin/add-airport" className ="btn btn-primary float-end">Add Airports</Link>
                                </h4>
                            </div>
                            <div className='card-body'>
                                <table className = "table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Airport_ID</th>
                                            <th>Short code </th>
                                            <th>Name</th>
                                            <th>Country</th>
                                            <th>State</th>
                                            <th>City</th>
                                            <th>Remove</th>
                                            <th>Edit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {airportsDetails}
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

export default Airports;
