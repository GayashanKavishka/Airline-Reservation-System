// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import "./AddAirports.css";

// const AddAirports = () => {
//     const [formData, setFormData] = useState({
//         Short_name: '',
//         Name: '',
//         Country: '',
//         State: '',
//         City: ''
//     });

//     const [country, setCountry] = useState('');
//     const [state, setState] = useState('');
//     const [city, setCity] = useState('');

//     const [states, setStates] = useState([]);
//     const [cities, setCities] = useState([]);
//     const [locationData, setLocationData] = useState([]);
//     const [uniqueCountries, setUniqueCountries] = useState([]);


//     const navigate = useNavigate();

//     useEffect(() => {
//         axios.get('http://localhost:5174/airport/countries')
//             .then(res => {setLocationData(res.data); 
//                 console.log(res.data);
//                 setUniqueCountries([...new Set(res.data.map(item => item.country))]);
//              })
//             .catch(err => {
//                 console.error(err);
//                 alert('Error fetching location data');
//             });
//     }, []);

//     // Extract unique countries
//     // const uniqueCountries = [...new Set(locationData.map(item => item.country))];
    

//     // Update states based on selected or typed country
//     const updateStates = (selectedCountry) => {
//         const statesForCountry = [...new Set(
//             locationData.filter(item => item.country.toLowerCase() === selectedCountry.toLowerCase()).map(item => item.state)
//         )];
//         setStates(statesForCountry);
//         setCities([]);
//     };

//     // Update cities based on selected or typed state
//     const updateCities = (selectedState) => {
//         const citiesForState = locationData
//             .filter(item => item.country === country && item.state === selectedState)
//             .map(item => item.city);
//         setCities(citiesForState);
//     };

//     // Handle country change
//     const handleCountryChange = (e) => {
//         const selectedCountry = e.target.value;
//         setCountry(selectedCountry);
//         formData.Country = selectedCountry;
//         updateStates(selectedCountry);
//     };

//     // Handle state change
//     const handleStateChange = (e) => {
//         const selectedState = e.target.value;
//         setState(selectedState);
//         formData.State = selectedState;
//         updateCities(selectedState);
//     };

//     // Handle city change
//     const handleCityChange = (e) => {
//         setCity(e.target.value);
//         formData.City = e.target.value;
//         // console.log(formData);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const airportData = {
//             Short_code: formData.Short_name,
//             name: formData.Name,
//             Country: formData.Country,
//             State: formData.State,
//             city: formData.City
//         };

//         console.log(airportData);
        
//         axios.post('http://localhost:5174/airport/insertAirport', airportData)
//             .then(res => {
//                 if (res.status === 400) {
//                     alert('Model name not found in the models table.');
//                 } else {
//                     alert('Airport added successfully!');
//                     navigate('/admin/airport'); 
//                 }
//             })
//             .catch(err => {
//                 console.error(err);
//                 alert('Error adding airport');
//             });
//     };

//     return (
//         <div className="contain1">
//             <h2>Add New Airport</h2>
//             <form onSubmit={handleSubmit}>
//                 {/* <div className="mb-3">
//                     <label className="form-label">Airport ID</label>
//                     <input 
//                         type="text" 
//                         className="form-control"
//                         name="Airport_ID"
//                         value={formData.Airport_ID}
//                         onChange={(e) => setFormData({ ...formData, Airport_ID: e.target.value })}
//                         required
//                     />
//                 </div> */}
//                 <div className="mb-3">
//                     <label className="form-label">Short Name</label>
//                     <input 
//                         type="text" 
//                         className="form-control"
//                         name="Short_name"
//                         value={formData.Short_name}
//                         onChange={(e) => setFormData({ ...formData, Short_name: e.target.value })}
//                         required
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <label className="form-label">Name</label>
//                     <input 
//                         type="text" 
//                         className="form-control"
//                         name="Name"
//                         value={formData.Name}
//                         onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
//                         required
//                     />
//                 </div>
                
//                 <div className="mb-3">
//                     <label className="form-label">Country</label>
//                     <input 
//                         type="text"
//                         className="form-control"
//                         placeholder="Type or select a country"
//                         value={country}
//                         onChange={(e) => handleCountryChange(e)}
//                         list="country-options"
//                     />
//                     <datalist id="country-options">
//                         {uniqueCountries.map((c) => (
//                             <option key={c} value={c}>{c}</option>
//                         ))}
//                         <option value="USA" />
//                         <option value="Canada" />
//                     </datalist>
//                 </div>
                
//                 <div className="mb-3">
//                     <label className="form-label">State</label>
//                     <input 
//                         type="text"
//                         className="form-control"
//                         placeholder="Type or select a state"
//                         value={state}
//                         onChange={(e) => handleStateChange(e)}
//                         list="state-options"
//                         disabled={!country}
//                     />
//                     <datalist id="state-options">
//                         {states.map((s) => (
//                             <option key={s} value={s}>{s}</option>
//                         ))}
//                     </datalist>
//                 </div>
                
//                 <div className="mb-3">
//                     <label className="form-label">City</label>
//                     <input 
//                         type="text"
//                         className="form-control"
//                         placeholder="Type or select a city"
//                         value={city}
//                         onChange={(e) => handleCityChange(e)}
//                         list="city-options"
//                         disabled={!state}
//                     />
//                     <datalist id="city-options">
//                         {cities.map((c) => (
//                             <option key={c} value={c}>{c}</option>
//                         ))}
//                     </datalist>
//                 </div>
                
//                 <button type="submit" className="btn btn-primary">Add Airport</button>
//             </form>
//         </div>
//     );
// };

// export default AddAirports;






import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./AddAirports.css";

const AddAirports = () => {
    const [formData, setFormData] = useState({
        Short_name: '',
        Name: '',
        Country: '',
        State: '',
        City: ''
    });

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [locationData, setLocationData] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch location data from the backend
        axios.get('http://localhost:5174/airport/countries')
            .then(res => {
                setLocationData(res.data);
                const uniqueCountries = [...new Set(res.data.map(item => item.country))];
                setCountries(uniqueCountries);
            })
            .catch(err => {
                console.error(err);
                alert('Error fetching location data');
            });
    }, []);

    // Update states based on selected country
    const handleCountryChange = (e) => {
        const selectedCountry = e.target.value;
        setFormData({ ...formData, Country: selectedCountry });
        const statesForCountry = [...new Set(
            locationData
                .filter(item => item.country === selectedCountry)
                .map(item => item.state)
        )];
        setStates(statesForCountry);
        setCities([]); // Reset cities
    };

    // Update cities based on selected state
    const handleStateChange = (e) => {
        const selectedState = e.target.value;
        setFormData({ ...formData, State: selectedState });
        const citiesForState = locationData
            .filter(item => item.state === selectedState && item.country === formData.Country)
            .map(item => item.city);
        setCities(citiesForState);
    };

    // Handle city change
    const handleCityChange = (e) => {
        const selectedCity = e.target.value;
        setFormData({ ...formData, City: selectedCity });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const airportData = {
            Short_code: formData.Short_name,
            name: formData.Name,
            Country: formData.Country,
            State: formData.State,
            city: formData.City
        };

        axios.post('http://localhost:5174/airport/insertAirport', airportData)
            .then(res => {
                alert('Airport added successfully!');
                navigate('/admin/airport');
            })
            .catch(err => {
                console.error(err);
                alert('Error adding airport');
            });
    };

    return (
        <div className="contain1">
            <h2>Add New Airport</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Short Name</label>
                    <input 
                        type="text" 
                        className="form-control"
                        value={formData.Short_name}
                        onChange={(e) => setFormData({ ...formData, Short_name: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input 
                        type="text" 
                        className="form-control"
                        value={formData.Name}
                        onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label" >Country</label>
                    <select 
                        className="form-control" 
                        value={formData.Country} 
                        onChange={handleCountryChange}
                        required

                        style = {{width :"225px"}}
                    >
                        <option value="">Select a country</option>
                        {countries.map((country) => (
                            <option key={country} value={country}>{country}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">State</label>
                    <select 
                        className="form-control" 
                        value={formData.State} 
                        onChange={handleStateChange}
                        disabled={!states.length}
                        required
                        style = {{width :"225px"}}
                    >
                        <option value="">Select a state</option>
                        {states.map((state) => (
                            <option key={state} value={state}>{state}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">City</label>
                    <select 
                        className="form-control" 
                        value={formData.City} 
                        onChange={handleCityChange}
                        disabled={!cities.length}
                        required
                        style = {{width :"225px"}}
                    >
                        <option value="">Select a city</option>
                        {cities.map((city) => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Add Airport</button>
            </form>
        </div>
    );
};

export default AddAirports;
