// import React, { useEffect } from 'react';
// import { useState } from 'react';
// import './Dashbord.css'; // CSS file for styling
// import AdminNav from '../../../components/AdminNav/AdminNav';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// const Dashbord = () => {
//    const [count, setCount] = useState(0);
//    const [flight_count, setFlight_count] = useState(0);
//    const [aircraft_count, setAircraft_count] = useState(0);
//    const [airport_count,setAirport_count] = useState(0);



//    useEffect(() => {
//     axios.get('http://localhost:5174/user/count').then(res => {
//         console.log(res);
//         setCount(res.data);
//     })


//     axios.get('http://localhost:5174/schedule/count').then(res => {
//         setFlight_count(res.data);
//     })

//     axios.get('http://localhost:5174/aircraft/count/total').then(res => {
//       setAircraft_count(res.data);
//      })

//     axios.get('http://localhost:5174/airport/count').then(res => {
//       setAirport_count(res.data);
//     });

// }, []);


//   // axios.get('http://localhost:5174/schedule/count')
//   // .then(res => setFlight_count(res.data))
//   // .catch(err => console.error(err));


//   return (
//     <div>
//         <AdminNav />
//         <div className='heading'><h1 className='head'>Welcome to <span className='B'>B</span> Airways Admin page</h1></div>
//         <div className="tiles-container">
//         <div className='line'>
//           <div className="tile">
//             <h2>Users</h2>
//             <p>{count}+</p>
//           </div>
//           <Link to='/admin/add-schedule'>
//           <div className="tile">
//             <h2>Flights</h2>
//             <p>{flight_count}+</p>
//           </div>
//           </Link>
//         </div>
//         <div className='line'>
//              <Link to = "/admin/airplane">
//             <div className="tile">
//               <h2>Airplanes</h2>
//               <p>{aircraft_count}+</p>
//             </div>
//             </Link>
//             <div className="tile">
//               <Link to = "/admin/airport">
//               <h2>Airports</h2>
//               <p>{airport_count}+</p>
//               </Link>
//             </div>
//         </div>
//       </div>

//       <hr className='hori_line'/>

//     </div>
//   );
// };

// export default Dashbord;


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CountUp from 'react-countup';
import AdminNav from '../../../components/AdminNav/AdminNav';

const Dashbord = () => {
  const [count, setCount] = useState(0);
  const [flight_count, setFlight_count] = useState(0);
  const [aircraft_count, setAircraft_count] = useState(0);
  const [airport_count, setAirport_count] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:5174/user/count').then((res) => setCount(res.data));
    axios.get('http://localhost:5174/schedule/count').then((res) => setFlight_count(res.data));
    axios.get('http://localhost:5174/aircraft/count/total').then((res) => setAircraft_count(res.data));
    axios.get('http://localhost:5174/airport/count').then((res) => setAirport_count(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <AdminNav />
      <div className="container mx-auto py-8 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold">
            Welcome to <span className="text-purple-500">B</span> Airways Admin Page
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-800 shadow-lg rounded-lg p-6 text-center">
            <h2 className="text-xl font-medium text-purple-400 mb-4">Users</h2>
            <p className="text-4xl font-semibold text-white">
              <CountUp start={0} end={count} duration={2.5} separator="," />+
            </p>
          </div>

          <Link to="/admin/add-schedule" className="hover:scale-105 transition-transform duration-300">
            <div className="bg-gray-800 shadow-lg rounded-lg p-6 text-center hover:bg-gray-700">
              <h2 className="text-xl font-medium text-purple-400 mb-4">Flights</h2>
              <p className="text-4xl font-semibold text-white">
                <CountUp start={0} end={flight_count} duration={2.5} separator="," />+
              </p>
            </div>
          </Link>

          <Link to="/admin/airplane" className="hover:scale-105 transition-transform duration-300">
            <div className="bg-gray-800 shadow-lg rounded-lg p-6 text-center hover:bg-gray-700">
              <h2 className="text-xl font-medium text-purple-400 mb-4">Airplanes</h2>
              <p className="text-4xl font-semibold text-white">
                <CountUp start={0} end={aircraft_count} duration={2.5} separator="," />+
              </p>
            </div>
          </Link>

          <Link to="/admin/airport" className="hover:scale-105 transition-transform duration-300">
            <div className="bg-gray-800 shadow-lg rounded-lg p-6 text-center hover:bg-gray-700">
              <h2 className="text-xl font-medium text-purple-400 mb-4">Airports</h2>
              <p className="text-4xl font-semibold text-white">
                <CountUp start={0} end={airport_count} duration={2.5} separator="," />+
              </p>
            </div>
          </Link>
        </div>

        <hr className="my-12 border-gray-700" />
      </div>
    </div>
  );
};

export default Dashbord;

