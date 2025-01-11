// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import "./Model.css"
// // import EditPage from '../EditPage/EditPage';
// import AdminNav from '../../../components/AdminNav/AdminNav';

// const Model = ({ isAdmin }) => {
//     const [flights, setFlights] = useState([]);
//     const [editable, setEditable] = useState(null);
//     const [Models, setModels] = useState([]);

//     let navigate = useNavigate();

//     // const handleEdit = (id) => {
//     //     navigate(`/edit/${id}`); // direct to the edit page with flight ID
//     // };

//     const handleEdit = (Models) => {
//         // Pass the entire flight data to the edit page
//         const a = Models.Model_ID;
//         navigate(`/admin/edit-model/${a}`, { state: {Models} });
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


//     const handleRemove = (Model_ID) => {
//          axios.delete(`http://localhost:5174/models/${Model_ID}`);
//             setModels(Models.filter((item) => item.Model_ID !== Model_ID));
//     };



    
      

//     // Fetch flight schedule data on component mount
//     useEffect(() => {
//         axios.get('http://localhost:5174/models').then(res => {
//             console.log(res);
//             setModels(res.data);
//         })

//     }, []);

//     var modelDetails = "";
//     modelDetails = Models.map((item, index) => {
//         return (
//             <tr key = {index} className='data'>
//                 <td>{item.Model_ID}</td>
//                 <td>{item.Model_name}</td>
//                 <td>{item.EconomyClassSeatCount}</td>
//                 <td>{item.BusinessClassSeatCount}</td>
//                 <td>{item.PlatinumClassSeatCount}</td>
//                 <td>
//                     <button 
//                     className="btn btn-success" 
//                     onClick={() => handleRemove(item.Model_ID)} // Pass Aircraft_ID to handleBook
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

    

//     // const handleSave = (id) => {
//     //     axios.put(`http://localhost:5174/api/schedule/${id}`, schedule)
//     //         .then(res => {
//     //             alert(res.data);
//     //             setEditable(null);
//     //             // Refresh the table after saving
//     //             return axios.get('http://localhost:5174/schedule');
//     //         })
//     //         .then(res => setFlights(res.data))
//     //         .catch(err => console.error(err));
//     // };

//     // const handleChange = (e, field) => {
//     //     setUpdatedFlight({ ...updatedFlight, [field]: e.target.value });
//     // };

//     return (
//         <div>
//             {/* <h1>Flight Schedule</h1> */}
//             <AdminNav />
//             <div className ="contain">
//                 <div className = "row">
//                     <div className = "col-md-12">
//                         <div className='card'>
//                             <div className = "card-header">
//                                 <h4>Model
//                                     <Link to="/admin/add-model" className ="btn btn-primary float-end">Add Model</Link>
//                                 </h4>
//                             </div>
//                             <div className='card-body'>
//                                 <table className = "table table-striped">
//                                     <thead>
//                                         <tr>
//                                             <th>Model_ID</th>
//                                             <th>Name of Model</th>
//                                             <th>Economy Class Seat Count</th>
//                                             <th>Business Class Seat Count</th>
//                                             <th>Platinum Class Seat Count</th>
//                                             <th>Remove</th>
//                                             <th>Edit</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {modelDetails}
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

// export default Model;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import AdminNav from '../../../components/AdminNav/AdminNav';

const Model = ({ isAdmin }) => {
    const [Models, setModels] = useState([]);
    const navigate = useNavigate();

    const handleEdit = (model) => {
        const modelId = model.Model_ID;
        navigate(`/admin/edit-model/${modelId}`, { state: { model } });
    };

    const handleRemove = (Model_ID) => {
        axios
            .delete(`http://localhost:5174/models/${Model_ID}`)
            .then(() => setModels(Models.filter((item) => item.Model_ID !== Model_ID)))
            .catch((err) => console.error("Error deleting model:", err));
    };

    useEffect(() => {
        axios.get('http://localhost:5174/models').then((res) => {
            setModels(res.data);
        });
    }, []);

    const modelDetails = Models.map((item, index) => (
        <tr key={index} className="even:bg-gray-800 odd:bg-gray-700 text-white">
            <td className="px-4 py-2 border border-gray-700">{item.Model_ID}</td>
            <td className="px-4 py-2 border border-gray-700">{item.Model_name}</td>
            <td className="px-4 py-2 border border-gray-700">{item.EconomyClassSeatCount}</td>
            <td className="px-4 py-2 border border-gray-700">{item.BusinessClassSeatCount}</td>
            <td className="px-4 py-2 border border-gray-700">{item.PlatinumClassSeatCount}</td>
            <td className="px-4 py-2 border border-gray-700">
                <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    onClick={() => handleRemove(item.Model_ID)}
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
                        <h4 className="text-xl font-semibold">Models</h4>
                        <Link
                            to="/admin/add-model"
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                        >
                            Add Model
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full border-collapse border border-gray-700">
                            <thead>
                                <tr className="bg-gray-700 text-left">
                                    <th className="px-4 py-2 border border-gray-700">Model ID</th>
                                    <th className="px-4 py-2 border border-gray-700">Name of Model</th>
                                    <th className="px-4 py-2 border border-gray-700">Economy Class Seat Count</th>
                                    <th className="px-4 py-2 border border-gray-700">Business Class Seat Count</th>
                                    <th className="px-4 py-2 border border-gray-700">Platinum Class Seat Count</th>
                                    <th className="px-4 py-2 border border-gray-700">Remove</th>
                                    <th className="px-4 py-2 border border-gray-700">Edit</th>
                                </tr>
                            </thead>
                            <tbody>{modelDetails}</tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Model;

