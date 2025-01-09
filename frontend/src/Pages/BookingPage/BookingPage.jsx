// import React, { useEffect ,useState} from 'react';
// import { useLocation,useParams } from 'react-router-dom';
// import AircraftSeatLayout from '../../components/Seat/Seat';
// import axios from 'axios';

// const BookingPage = () => {
//   const location = useLocation();
//   const Flight_ID = useParams();
//   // const { state } = location; // Access the state object
//   // const { economySeats, businessSeats, platinumSeats } = state?.seatConfiguration || {}; // Safely access seatConfiguration

//   const [economySeats, setEconomySeats] = useState(null);
//   const [businessSeats, setBusinessSeats] = useState(null);
//   const [platinumSeats, setPlatinumSeats] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         console.log(Flight_ID.id);
//         const response = await axios.get(`http://localhost:5174/schedule/seats/${Flight_ID.id}`);
//         const data = response.data[0];
//         setEconomySeats(data.EconomyClassSeatCount);
//         setBusinessSeats(data.BusinessClassSeatCount);
//         setPlatinumSeats(data.PlatinumClassSeatCount);
        
//       } catch (error) {
//         console.error('Error fetching flight schedule:', error);
//       }
//     };

//     fetchData();
//   },[Flight_ID]);


//   useEffect(() => {
//     console.log('Updated Seats:', { economySeats, businessSeats, platinumSeats });
//   }, [economySeats, businessSeats, platinumSeats]);


  

//   return (
//     <div>
//       <h2>Choose Your Seats</h2>
      
//        {economySeats && (
//         <>
//           <h3>Economy</h3>
//           <AircraftSeatLayout totalSeats={economySeats} seatType="Economy" />
//         </>
//       )}
      
//       {businessSeats && (
//         <>
//           <h3>Business</h3>
//           <AircraftSeatLayout totalSeats={businessSeats} seatType="Business" />
//         </>
//       )}

//       {platinumSeats && (
//         <>
//           <h3>Platinum</h3>
//           <AircraftSeatLayout totalSeats={platinumSeats} seatType="Platinum" />
//         </>
//       )}
//     </div>
//   );
// };

// export default BookingPage;


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AircraftSeatLayout from '../../components/Seat/Seat';
import axios from 'axios';

const BookingPage = () => {
  const { id: flightId } = useParams(); // Destructure id from useParams
  const [economySeats, setEconomySeats] = useState(null);
  const [businessSeats, setBusinessSeats] = useState(null);
  const [platinumSeats, setPlatinumSeats] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Flight ID:', flightId);
        const response = await axios.get(`http://localhost:5174/schedule/seats/${flightId}`);
        const data = response.data[0];
        setEconomySeats(data.EconomyClassSeatCount);
        setBusinessSeats(data.BusinessClassSeatCount);
        setPlatinumSeats(data.PlatinumClassSeatCount);
      } catch (error) {
        console.error('Error fetching flight schedule:', error);
      }
    };

    fetchData();
  }, [flightId]);

  return (
    <div>

      {/* Render AircraftSeatLayout only if seat data is available */}
      {economySeats !== null && businessSeats !== null && platinumSeats !== null ? (
        <AircraftSeatLayout
          seatConfig={{
            economySeats,
            businessSeats,
            platinumSeats,
          }}

          flight_ID={flightId}
        />
      ) : (
        <p>Loading seat information...</p>
      )}
    </div>
  );
};

export default BookingPage;

