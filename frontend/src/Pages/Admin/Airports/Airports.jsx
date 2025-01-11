// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import "./Airports.css"
// // import EditPage from '../EditPage/EditPage';
// import AdminNav from '../../../components/AdminNav/AdminNav';

// const Airports = ({ isAdmin }) => {
//     const [flights, setFlights] = useState([]);
//     const [editable, setEditable] = useState(null);
//     const [airports, setAirports] = useState([]);

//     let navigate = useNavigate();

//     // const handleEdit = (id) => {
//     //     navigate(`/edit/${id}`); // direct to the edit page with flight ID
//     // };


//     const handleEdit = (plane) => {
//         // Pass the entire flight data to the edit page
//         navigate(`/admin/edit-airplane/${airports.Airport_ID}`, { state: {airports } });
//     };

//     const handleAddSchedule = () => {
//         navigate('/add-schedule'); // direct to the add schedule page
//     };
     
//     const handleBook = async (aircraft_Id) => {
//         try {
//             const response = await axios.get(`http://localhost:5174/aircraft/${aircraft_Id}`);
//             const seatConfiguration = response.data; // This will contain economy, business, platinum seat counts
    
//             // Pass state correctly
//             navigate('/book', { state: { seatConfiguration } }); // Make sure to use `state` object
//         } catch (error) {
//             console.error('Error fetching seat configuration', error);
//         }
//     };


//     const handleRemove = (Airport_ID) => {
//          axios.delete(`http://localhost:5174/aircraft/${Airport_ID}`);
//             setAirports(airports.filter((item) => item.Aircraft_ID !== Aircraft_ID));
//     };



    
      

//     // Fetch flight schedule data on component mount
//     useEffect(() => {
//         axios.get('http://localhost:5174/airport/airport/all').then(res => {
//             console.log(res);
//             setAirports(res.data);
//         })

//     }, []);

//     var airportsDetails = "";
//     airportsDetails = airports.map((item, index) => {
//         return (
//             <tr key = {index} className='data'>
//                 <td>{item.Airport_ID}</td>
//                 <td>{item.Short_code}</td>
//                 <td>{item.Name}</td>
//                 <td>{item.Country}</td>
//                 <td>{item.State}</td>
//                 <td>{item.City}</td>
//                 <td>
//                     <button 
//                     className="btn btn-success" 
//                     onClick={() => handleRemove(item.Airport_ID)} // Pass Aircraft_ID to handleBook
//                     >
//                     Remove
//                     </button>
//                 </td>
//                 <td>
//                     <button 
//                         className="btn btn-success" 
//                         onClick={() => handleEdit(item)} // Use item.Flight_ID for navigation
//                     >
//                         Edit
//                     </button>
//                 </td>
//             </tr>
//         )
//     });


//     return (
//         <div>
//             {/* <h1>Flight Schedule</h1> */}
//             <AdminNav />
//             <div className ="contain">
//                 <div className = "row">
//                     <div className = "col-md-12">
//                         <div className='card'>
//                             <div className = "card-header">
//                                 <h4>Airports
//                                     <Link to="/admin/add-airport" className ="btn btn-primary float-end">Add Airports</Link>
//                                 </h4>
//                             </div>
//                             <div className='card-body'>
//                                 <table className = "table table-striped">
//                                     <thead>
//                                         <tr>
//                                             <th>Airport_ID</th>
//                                             <th>Short code </th>
//                                             <th>Name</th>
//                                             <th>Country</th>
//                                             <th>State</th>
//                                             <th>City</th>
//                                             <th>Remove</th>
//                                             <th>Edit</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {airportsDetails}
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

// export default Airports;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import AdminNav from '../../../components/AdminNav/AdminNav';

const Airports = ({ isAdmin }) => {
    const [airports, setAirports] = useState([]);

    const navigate = useNavigate();

    const handleEdit = (airport) => {
        navigate(`/admin/edit-airport/${airport.Airport_ID}`, { state: { airport } });
    };

    const handleRemove = (Airport_ID) => {
        axios
            .delete(`http://localhost:5174/airport/${Airport_ID}`)
            .then(() => setAirports(airports.filter((item) => item.Airport_ID !== Airport_ID)))
            .catch((err) => console.error("Error deleting airport:", err));
    };

    useEffect(() => {
        axios.get('http://localhost:5174/airport/airport/all').then((res) => {
            setAirports(res.data);
        });
    }, []);

    const airportsDetails = airports.map((item, index) => (
        <tr key={index} className="even:bg-gray-800 odd:bg-gray-700 text-white">
            <td className="px-4 py-2 border border-gray-700">{item.Airport_ID}</td>
            <td className="px-4 py-2 border border-gray-700">{item.Short_code}</td>
            <td className="px-4 py-2 border border-gray-700">{item.Name}</td>
            <td className="px-4 py-2 border border-gray-700">{item.Country}</td>
            <td className="px-4 py-2 border border-gray-700">{item.State}</td>
            <td className="px-4 py-2 border border-gray-700">{item.City}</td>
            <td className="px-4 py-2 border border-gray-700">
                <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    onClick={() => handleRemove(item.Airport_ID)}
                >
                    Remove
                </button>
            </td>
            <td className="px-4 py-2 border border-gray-700">
                <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                    onClick={() => handleEdit(item)}
                >
                    Edit
                </button>
            </td>
        </tr>
    ));

    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <AdminNav />
            <div className="container mx-auto px-4 py-8">
                <div className="bg-gray-800 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center p-4 border-b border-gray-700">
                        <h4 className="text-xl font-semibold">Airports</h4>
                        <Link
                            to="/admin/add-airport"
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                        >
                            Add Airport
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full border-collapse border border-gray-700">
                            <thead>
                                <tr className="bg-gray-700 text-left">
                                    <th className="px-4 py-2 border border-gray-700">Airport ID</th>
                                    <th className="px-4 py-2 border border-gray-700">Short Code</th>
                                    <th className="px-4 py-2 border border-gray-700">Name</th>
                                    <th className="px-4 py-2 border border-gray-700">Country</th>
                                    <th className="px-4 py-2 border border-gray-700">State</th>
                                    <th className="px-4 py-2 border border-gray-700">City</th>
                                    <th className="px-4 py-2 border border-gray-700">Remove</th>
                                    <th className="px-4 py-2 border border-gray-700">Edit</th>
                                </tr>
                            </thead>
                            <tbody>{airportsDetails}</tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Airports;

