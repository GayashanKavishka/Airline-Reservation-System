
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
import { jwtDecode } from 'jwt-decode';



const Seat = ({ seatNumber, isSelected, onClick, seatType, isBooked}) => {
  const seatColors = {
    Economy: 'text-green-600',
    Business: 'text-blue-600',
    Platinum: 'text-yellow-500'
  };

  return (
    <div className="flex flex-col items-center">
      <MdOutlineChair
        className={`text-4xl cursor-pointer transition-transform duration-300 ${
          //  isBooked && isSelected
          //  ? 'text-violet-600 scale-110' // Slight scaling for selected seats
          //  :
          //   isBooked
          //   ? 'text-neutral-400 cursor-not-allowed' // Gray color and no click for booked seat
          //   : isSelected
          //   ? 'text-violet-600 scale-110' // Slight scaling for selected seats
          //   : `${seatColors[seatType]} hover:scale-110` // Hover effect for unselected seats
            ( ()=>{
                if(isBooked && isSelected){
                  return 'text-violet-600 scale-110';
                }
                else if(isBooked){
                  return 'text-neutral-400 cursor-not-allowed';
                }
                else if(isSelected){
                  return 'text-violet-600 scale-110';
                }
                else{
                  return `${seatColors[seatType]} hover:scale-110`;
                }
             })()
        }`}
        onClick={isSelected && isBooked ? onClick : !isBooked ? onClick : null} // Disable click for booked seats
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

  const accessToken = localStorage.getItem('accessToken');

  const [Aircraft_ID, setAircraft_ID] = useState(null);

  const[prices,setPrices] = useState({
    Economy: '',
    Business: '',
    Platinum: ''
  });

  const ClassType = {
    Economy: 1,
    Business: 2,
    Platinum: 3
  }

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

  useEffect(()=>{
     axios.get(`http://localhost:5174/schedule/modify/id?id=${flight_ID}`)
     .then((response)=>{
        setAircraft_ID(response.data.Aircraft_ID);
        console.log('Aircraft ID:', response.data.Aircraft_ID);
     })
     .catch((error)=>{
        console.error('Error fetching flight schedule:', error);
     })



  },[flight_ID]); 

  useEffect(()=>{
    const PselectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if(PselectedSeats){
      setSelectedSeats(PselectedSeats);
    }
  },[]);

  useEffect(()=>{
    if(selectedSeats.length > 0){
      console.log('Selected Seats:', selectedSeats);
    }
  },[selectedSeats]);

  useEffect(()=>{
    if(Aircraft_ID){
      console.log('Aircraft ID from var:', Aircraft_ID);
    }
    else{
      console.log('Aircraft ID not found');
    }
    
  },[Aircraft_ID]);




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
     
     localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
     console.log('Selected Seats:', selectedSeats);
     if (selectedSeats.length === 0) {
      alert('Please select at least one seat');
     }
     else{
            console.log('Selected Seats:', selectedSeats);
            if(accessToken) {
               const responce = confirm("Are you sure you want to book these seat? You cant't undo this action");
               if(!responce){
                  return;
               }
               else{
               const seat_num = selectedSeats[0].split("-")[1];
               const type = selectedSeats[0].split("-")[0];
               console.log(accessToken);
               console.log(jwtDecode(accessToken));
               const Passenger_ID = jwtDecode(accessToken).passengerId;
               console.log('Passenger ID:', Passenger_ID);
               axios.post(`http://localhost:5174/reservation/make_a_ticket`,{
                  Class_ID: ClassType[type],
                  Flight_ID: flight_ID,
                  seat_price: prices[type],
                  seat_num: seat_num,
                  Passenger_ID: Passenger_ID
               }).then((response) => {
                console.log('Ticket Data:', response.data);
                const duplicateselectedSeats = [...selectedSeats];
                navigate('/ticket', {state: {duplicateselectedSeats,flight_ID,prices}});
               })
                .catch((error) => {
                  console.error('Error fetching flight schedule:', error);
                });
              }
            }
            else{
              navigate(`/passanger-details/${selectedSeats[0]}`, { state: { selectedSeats,flight_ID,prices} });
            }
          }
  };


  const ToggleSeatStatus =(Class_ID,seat_num)=>{
      axios.put(`http://localhost:5174/schedule/toggle-seat-status`,{
        Flight_ID: flight_ID,
        Class_ID: Class_ID,
        seat_num: seat_num
      })
      .then((response) => {
           console.log('Seat updated', response.data);
           axios
          .get(`http://localhost:5174/schedule/seat-status/${flight_ID}`)
          .then((response) => {
            setSeatData(response.data);
            console.log('Seat Data:', response.data);
          })
          .catch((error) => {
            console.error('Error fetching flight schedule:', error);
          });
          })
      .catch((error) => {
        console.error('Error updating seat:', error);
      });
  }

  const handleSeatClick = (seatNumber, seatType) => {
    const seatIdentifier = `${seatType}-${seatNumber}`;
    if (selectedSeats.includes(seatIdentifier)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatIdentifier));
      ToggleSeatStatus(ClassType[seatType],seatNumber);
    } else {
      if(accessToken && selectedSeats.length < 1) {
        setSelectedSeats([...selectedSeats, seatIdentifier]);
        ToggleSeatStatus(ClassType[seatType],seatNumber);
      }
      else if(accessToken && selectedSeats.length >= 1)
      {
        alert('You can only select a maximum of 1 seat');
      }
      else if (selectedSeats.length < 10) {
        setSelectedSeats([...selectedSeats, seatIdentifier]);
        ToggleSeatStatus(ClassType[seatType],seatNumber);
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

          // const P_selected = PselectedSeats.includes(`${seatType}-${i}`);

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
