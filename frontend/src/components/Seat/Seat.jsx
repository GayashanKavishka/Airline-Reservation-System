
// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import { MdOutlineChair } from 'react-icons/md';

// const Seat = ({ seatNumber, isSelected, onClick, seatType, isBooked }) => {
//   const seatColors = {
//     Economy: 'text-green-600',
//     Business: 'text-blue-600',
//     Platinum: 'text-yellow-500'
//   };

//   return (
//     <div className="flex flex-col items-center">
//       <MdOutlineChair
//         className={`text-3xl cursor-pointer ${
//           isBooked
//             ? 'text-neutral-400 cursor-not-allowed' // Gray color and no click for booked seats
//             : isSelected
//             ? 'text-violet-600'
//             : seatColors[seatType] || 'text-neutral-600'
//         }`}
//         onClick={!isBooked ? onClick : null} // Disable click for booked seats
//       />
//       <p className={`text-xs text-center ${isBooked ? 'text-neutral-400' : ''}`}>
//         {seatNumber}
//       </p>
//     </div>
//   );
// };

// const AircraftSeatLayout = ({ seatConfig, flight_ID }) => {
//   const { economySeats, businessSeats, platinumSeats } = seatConfig; // Destructure seat config
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [seatData, setSeatData] = useState([]);
//   const [Aircraft_ID, setAircraft_ID] = useState(null);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:5174/schedule/seat-status/${flight_ID}`)
//       .then((response) => {
//         setSeatData(response.data);
//         console.log('Seat Data:', response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching flight schedule:', error);
//       });
//   }, [flight_ID]);


//   const handleConfermation = () => {

//     axios.get(`http://localhost:5174/schedule/modify/id?id=${flight_ID}`)
//     .then((response) => {
//       console.log('Seat Data:', response.data);
//       const Aircraft_ID = response.data.Aircraft_ID;
//       axios
//       .put(`http://localhost:5174/schedule/set-seat-status`, {
//         Flight_ID : flight_ID,
//         Aircraft_ID : Aircraft_ID,
//         SelectedSeat : selectedSeats
//       })
//       .then((response) => {
//         console.log('Seat Data:', response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching flight schedule:', error);
//       });

//     })
//     .catch((error) => {
//       console.error('Error fetching flight schedule:', error
//       );
//     });
//   };

//   const handleSeatClick = (seatNumber, seatType) => {
//     const seatIdentifier = `${seatType}-${seatNumber}`;
//     if (selectedSeats.includes(seatIdentifier)) {
//       setSelectedSeats(selectedSeats.filter((seat) => seat !== seatIdentifier));
//     } else {
//       if (selectedSeats.length < 10) {
//         setSelectedSeats([...selectedSeats, seatIdentifier]);
//       } else {
//         alert('You can only select a maximum of 10 seats');
//       }
//     }
//   };

//   const renderSeats = (totalSeats, seatType) => {
//     let seats = [];
//     for (let i = 1; i <= totalSeats; i++) {
//       const seatInfo = seatData.find(
//         (seat) => seat.ClassType === seatType && seat.seat_num === i
//       );
//       const isBooked = seatInfo ? seatInfo.Booked === 'yes' : false;

//       seats.push(
//         <Seat
//           key={`${seatType}-${i}`}
//           seatNumber={i}
//           seatType={seatType}
//           isSelected={selectedSeats.includes(`${seatType}-${i}`)}
//           onClick={() => handleSeatClick(i, seatType)}
//           isBooked={isBooked}
//         />
//       );
//     }
//     return seats;
//   };

//   const renderSeatLayout = () => {
//     return seatTypes.map(({ type, total }, index) => (
//       <div key={index} className="w-full my-4">
//         <h3 className="text-lg font-semibold">{type} Seats</h3>
//         <div className="flex flex-wrap gap-4 justify-center">
//           {renderSeats(total, type)}
//         </div>
//       </div>
//     ));
//   };

//   const seatTypes = [
//     { type: 'Economy', total: economySeats },
//     { type: 'Business', total: businessSeats },
//     { type: 'Platinum', total: platinumSeats }
//   ];

//   return (
//     <div className="space-y-5">
//       <h2 className="text-xl text-neutral-800 dark:text-neutral-100 font-medium">Choose a Seat</h2>

//       <div className="w-full flex flex-col items-center gap-6">
//         {renderSeatLayout()} {/* Render each seat class layout */}
//       </div>

//       <div className="mt-5">
//         <h3 className="text-lg font-semibold">Selected Seats:</h3>
//         <p>{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'No seats selected'}</p>
//       </div>

//       <button
//         className="w-full py-3 bg-primary-600 text-neutral-50 rounded-md hover:bg-primary-700"
//         onClick={handleConfermation}
//       >
//         Confirm
//       </button>
//     </div>
//   );
// };

// export default AircraftSeatLayout;

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { use } from 'react';
import { MdOutlineChair } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Seat = ({ seatNumber, isSelected, onClick, seatType, isBooked }) => {
  const seatColors = {
    Economy: 'text-green-600',
    Business: 'text-blue-600',
    Platinum: 'text-yellow-500'
  };

  return (
    <div className="flex flex-col items-center">
      <MdOutlineChair
        className={`text-4xl cursor-pointer transition-transform duration-300 ${
          isBooked
            ? 'text-neutral-400 cursor-not-allowed' // Gray color and no click for booked seats
            : isSelected
            ? 'text-violet-600 scale-110' // Slight scaling for selected seats
            : `${seatColors[seatType]} hover:scale-110` // Hover effect for unselected seats
        }`}
        onClick={!isBooked ? onClick : null} // Disable click for booked seats
      />
      <p
        className={`text-sm font-medium ${
          isBooked ? 'text-neutral-400' : 'text-neutral-600'
        }`}
      >
        {seatNumber}
      </p>
    </div>
  );
};

const AircraftSeatLayout = ({ seatConfig, flight_ID }) => {
  const { economySeats, businessSeats, platinumSeats } = seatConfig; // Destructure seat config
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatData, setSeatData] = useState([]);

  const navigate = useNavigate();

  const[prices,setPrices] = useState({
    Economy: '',
    Business: '',
    Platinum: ''
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5174/schedule/seat-status/${flight_ID}`)
      .then((response) => {
        setSeatData(response.data);
        console.log('Seat Data:', response.data);
      })
      .catch((error) => {
        console.error('Error fetching flight schedule:', error);
      });
  }, [flight_ID]);

  useEffect(() => {

    if(seatData.length > 0) {
         
    console.log('Seat Data 2:', seatData); 
    const economy = seatData.find((seat) => seat.ClassType === "Economy");
    const business = seatData.find((seat) => seat.ClassType === 'Business');
    const platinum = seatData.find((seat) => seat.ClassType === 'Platinum');
    if(economy){

    console.log('Economy:', economy.Price);
    setPrices({
      Economy: economy.Price,
      Business: business.Price,
      Platinum: platinum.Price
    }); 
    }
  }
  },[seatData]);

  useEffect(() => {
    if(prices)
    {console.log('Prices:', prices);}
  }, [prices]);


  const handleConfirmation = () => {
     if (selectedSeats.length === 0) {
      alert('Please select at least one seat');
     }
     else{
      axios
      .get(`http://localhost:5174/schedule/modify/id?id=${flight_ID}`)
      .then((response) => {
        const Aircraft_ID = response.data.Aircraft_ID;
        axios
          .put(`http://localhost:5174/schedule/set-seat-status`, {
            Flight_ID: flight_ID,
            Aircraft_ID,
            SelectedSeat: selectedSeats
          })
          .then((response) => {
            // console.log('Seat Data:', response.data);
            console.log('Selected Seats:', selectedSeats);
            navigate(`/passanger-details/${selectedSeats[0]}`, { state: { selectedSeats,flight_ID,prices} });

          })
          .catch((error) => {
            console.error('Error fetching flight schedule:', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching flight schedule:', error);
      });
     }
  };

  const handleSeatClick = (seatNumber, seatType) => {
    const seatIdentifier = `${seatType}-${seatNumber}`;
    if (selectedSeats.includes(seatIdentifier)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatIdentifier));
    } else {
      if (selectedSeats.length < 10) {
        setSelectedSeats([...selectedSeats, seatIdentifier]);
      } else {
        alert('You can only select a maximum of 10 seats');
      }
    }
  };

  const renderSeats = (totalSeats, seatType) => {
    let seats = [];
    for (let i = 1; i <= totalSeats; i++) {
      const seatInfo = seatData.find(
        (seat) => seat.ClassType === seatType && seat.seat_num === i
      );
      const isBooked = seatInfo ? seatInfo.Booked === 'yes' : false;

      seats.push(
        <Seat
          key={`${seatType}-${i}`}
          seatNumber={i}
          seatType={seatType}
          isSelected={selectedSeats.includes(`${seatType}-${i}`)}
          onClick={() => handleSeatClick(i, seatType)}
          isBooked={isBooked}
        />
      );
    }
    return seats;
  };

  const renderSeatLayout = () => {
    return seatTypes.map(({ type, total }, index) => (
      <div key={index} className="w-full my-6">
        <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">
          {type} Seats  Price :{prices[type]}
        </h3>
        <div className="grid grid-cols-12 gap-2 justify-center">
          {renderSeats(total, type)}
        </div>
      </div>
    ));
  };

  const seatTypes = [
    { type: 'Economy', total: economySeats },
    { type: 'Business', total: businessSeats },
    { type: 'Platinum', total: platinumSeats }
  ];

  return (
    <div className="space-y-8 bg-neutral-50 dark:bg-neutral-900 p-6 rounded-lg shadow-md" style = {{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
    <div className="flex space-x-10 ">
    <div className="block bg-white/10 backdrop-blur-md rounded-full py-7 px-12">
            <h2 className="text-white text-6xl font-bold">1</h2>
          </div>
          <div className="block bg-gradient-to-r from-blue-500 to-blue-700 rounded-full py-7 px-12">
            <h2 className="text-white text-6xl font-bold">2</h2>
          </div>
          <div className="block bg-white/10 backdrop-blur-md rounded-full py-7 px-12">
            <h2 className="text-white text-6xl font-bold">3</h2>
          </div>
          <div className="block bg-white/10 backdrop-blur-md rounded-full py-7 px-12">
            <h2 className="text-white text-6xl font-bold">4</h2>
          </div>
      </div>
      <h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100 text-center">
        Choose a Seat
      </h2>

      <div className="w-full flex flex-col items-center gap-8">
        {renderSeatLayout()} {/* Render each seat class layout */}
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
          Selected Seats:
        </h3>
        <p className="text-neutral-700 dark:text-neutral-300">
          {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'No seats selected'}
        </p>
      </div>

      <button
        className="w-full py-3 bg-violet-600 text-neutral-50 rounded-lg shadow hover:bg-violet-700 transition duration-300 font-semibold"
        onClick={handleConfirmation}
      >
        Confirm
      </button>
    </div>
  );
};

export default AircraftSeatLayout;
