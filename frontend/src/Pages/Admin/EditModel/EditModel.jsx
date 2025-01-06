// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';
// import "./EditModel.css";

// const EditModel= () => {
//     const { id } = useParams(); // Get Model ID from the URL
//     const navigate = useNavigate();
//     const location = useLocation(); // Use location to get state
//     const [Model, setModel] = useState({
//         Model_name: '',
//         Economy_seat_count: '',
//         Bussiness_seat_count: '',
//         Platinum_seat_count: '',
       
//     });

//     // If data is passed from the previous page, use it. Otherwise, fetch from API.
//     useEffect(() => {
//         if (location.state?.model) {
//             setModel(location.state.model);
//         } else {
//             axios.get(`http://localhost:5174/model/${id}`)
//                 .then(res => setModel(res.data))
//                 .catch(err => console.error(err));
//         }
//     }, [id, location.state]);

//     // Handle form input change
//     const handleChange = (e) => {
//         setModel({ ...Model, [e.target.name]: e.target.value });
//     };

//     // Handle form submission to update the flight details
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         axios.put(`http://localhost:5174/schedule/${id}`,Model)
//             .then(res => {
//                 alert('Flight details updated successfully');
//                 navigate('/admin/model'); // Redirect to schedule page after successful update
//             })
//             .catch(err => console.error(err));
//     };

//     return (
//         <div className="contain2">
//             <h2>Edit Model {id}</h2>
//             <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                     <label htmlFor="Model_name">Model Name</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         id="Model_name"
//                         name="Model_name"
//                         value={Model.Model_name}
//                         onChange={handleChange}
//                     />
//                 </div>

//                 <div className="form-group">
//                     <label htmlFor="Economy_seat">Economy seat count</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         id="Economy_seat_count"
//                         name="Economy_seat_count"
//                         value={Model.Economy_seat_count}
//                         onChange={handleChange}
//                     />
//                 </div>

//                 <div className="form-group">
//                     <label htmlFor="Expected_arrival_date_time">Bussiness seat count</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         id="Bussiness_seat_count"
//                         name="Bussiness_seat_count"
//                         value={Model.Bussiness_seat_count}
//                         onChange={handleChange}
//                     />
//                 </div>

//                 <div className="form-group">
//                     <label htmlFor="Departure_date_time">Platinum seat count</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         id="Platinum_seat_count"
//                         name="Platinum_seat_count"
//                         value={Model.Platinum_seat_count}
//                         onChange={handleChange}
//                     />
//                 </div>

//                 <button type="submit" className="btn-btn-primary1">Save Changes</button>
//             </form>
//         </div>
//     );
// };

// export default EditModel;


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import "./EditModel.css";

const EditModel = () => {
    const { id } = useParams(); // Get Model ID from the URL
    const navigate = useNavigate();
    const location = useLocation(); // Use location to get state
    const [Model,setModel] = useState({
        Model_name: '',
        Economy_seat_count: '',
        Bussiness_seat_count: '',
        Platinum_seat_count: '',
    });

    // If data is passed from the previous page, use it. Otherwise, fetch from API.
    useEffect(() => {
        if (location.state?.Models) {
            setModel(location.state.Models);
        } else {
            axios.get(`http://localhost:5174/models/${id}`)
                .then(res => setModel(res.data))
                .catch(err => console.error(err));
        }
    }, [id, location.state]);

    // Handle form input change
    const handleChange = (e) => {
        setModel({ ...Model, [e.target.name]: e.target.value });
    };

    // Handle form submission to update the model details
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5174/models/${id}`, Model)
            .then(res => {
                alert('Model details updated successfully');
                navigate('/admin/model'); // Redirect to model page after successful update
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="contain2">
            <h2>Edit Model {id}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="Model_name">Model Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="Model_name"
                        name="Model_name"
                        value={Model.Model_name}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="Economy_seat_count">Economy Seat Count</label>
                    <input
                        type="text"
                        className="form-control"
                        id="Economy_seat_count"
                        name="Economy_seat_count"
                        value={Model.Economy_seat_count}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="Bussiness_seat_count">Business Seat Count</label>
                    <input
                        type="text"
                        className="form-control"
                        id="Bussiness_seat_count"
                        name="Bussiness_seat_count"
                        value={Model.Bussiness_seat_count}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="Platinum_seat_count">Platinum Seat Count</label>
                    <input
                        type="text"
                        className="form-control"
                        id="Platinum_seat_count"
                        name="Platinum_seat_count"
                        value={Model.Platinum_seat_count}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className="btn-btn-primary1">Save Changes</button>
            </form>
        </div>
    );
};

export default EditModel;

