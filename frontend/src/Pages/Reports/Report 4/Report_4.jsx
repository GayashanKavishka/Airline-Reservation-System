import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import './Report_4.css';
import AdminNav from '../../../components/AdminNav/AdminNav';

const Report4 = () => {
    const [RevByAir, setRevByAir] = useState([]);
    const [flightID, setFlightID] = useState('');
    const [highlightedModel, setHighlightedModel] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5174/aircraft/admin/report4/all`);
                setRevByAir(response.data);
            } catch (error) {
                console.error('Error fetching booking data:', error);
            }
        };
        fetchData();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setHighlightedModel(flightID); // Set the highlighted model
    };

    return (
        <div>
            <AdminNav/>
        <div className="cont">
            <h2 className="heading"> Revanue By each Flight</h2>
            <form className="form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label className="label">Model :</label>
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
                <button type="submit" className="b">Find</button>
            </form>

            {RevByAir.length > 0 && (
                <table className="Table">
                    <thead>
                        <tr>
                            <th>Model Name</th>
                            <th>Total Revanue</th>
                        </tr>
                    </thead>
                    <tbody>
                        {RevByAir.map((data, index) => (
                            <tr key={index}
                              className={data.Model_name === highlightedModel ? 'highlighted' : ''}
                            >
                                <td>{data.Model_name}</td>
                                <td>{data.TotalRevenue}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
        </div>
    );
};

export default Report4;
