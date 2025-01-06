import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";


function SeatCollection(props) {
  const { rows, columns, FLight_ID, selectedClass, selectedSeatCount, onSeatSelect } = props;

  const seats = [];


  const [bookingData, setBookingData] = useState({});
  const [selectedSeat, setSelectedSeat] = useState({
    Platinum: null,
    Gold: null,
    Economy: null,
  });

  console.log("bookingData",bookingData,rows, columns,selectedClass, "Platinum")

  useEffect(() => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        axios.post(`http://localhost:5174/schedule/booked/${FLight_ID}`, { i, j, selectedClass })
          .then((response) => {

            console.log(i + 1, j + 1, response.data);
            setBookingData((bd) => ({ ...bd, [`${i + 1},${j + 1}`]: response.data }))

          })
      }
    }
  }, [FLight_ID, rows, columns, selectedClass]);

  const handleSeatClick = (seatKey) => {
    setSelectedSeat((prev) => ({
      ...prev,
      [selectedClass]: seatKey, // Update the selected seat for the current class
    }));
    onSeatSelect(seatKey); // Pass selected seat to parent
  };

  var count = 1;
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < columns; j++) {
      var seatNumber = count++;

      const seatKey = `${i + 1},${j + 1}`;

      let className = "w-1/10 px-3 py-3 rounded-2xl ml-2.5 my-1 ";
      if (bookingData[seatKey]) {
        className += "bg-red-400";  // Booked seat
      } else if (seatKey === selectedSeat[selectedClass]) {
        className += "bg-red-600";  // Selected seat for the current class
      } else {
        className += "bg-gray-400 hover:bg-gray-500";  // Available seat
      }

      row.push(
        <button
          key={`seat-${i}-${j}`}
          className={className}
          style={{ width: "50px", height: "50px" }}
          onClick={() => handleSeatClick(seatKey)}
        >
          <h5 className="text-sm text-center">
            {String(seatNumber).padStart(2, "0")}
          </h5>
        </button>
      );
    }
    seats.push(
      <div key={`row-${i}`} className="w-full flex">
        {row}
      </div>
    );
  }

  return <>{seats}</>;
}


function Seats(props) {
    

  let { FLight_ID } = useParams();
  console.log(FLight_ID);

  const navigate = useNavigate();

  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [seatConfig, setSeatConfig] = useState([]);
  const [econrows, setEconrows] = useState("");
  const [goldrows, setGoldrows] = useState("");
  const [platrows, setPlatrows] = useState("");
  const [booked, setBooked] = useState("");
  const [confirmBooking, setConfirmBooking] = useState(false);

  const [object, setObject] = useState([]);
  console.log("Rending")
  useEffect(() => {

    axios.get(`http://localhost:5174/schedule/booking/${FLight_ID}`).then((response) => {

      setSeatConfig(response.data);

      console.log(response)
    //   console.log("dhhhL ", response.data[0].Price)
      setObject(response.data)
      setSeatConfig(response.data);
    //   console.log(object)

    });

  }, [FLight_ID])


  const handleClassSelection = (seatClass) => {
    setSelectedClass(seatClass);
  };

  const handleSeatSelect = (seat) => {
    setSelectedSeat((prev) => ({
      ...prev,
      [selectedClass]: seat, // Set the selected seat for the current class
    }));
  };

  const handleProceed = async () => {
    if (selectedClass && selectedSeat && selectedSeat[selectedClass]) {
      // Get the seat coordinates for the selected class
      const seatString = selectedSeat[selectedClass];
      const [row, col] = seatString.split(',').map(Number);
  
      // Rest of your code remains the same
      const seatDetails = {
        Flight_ID: FLight_ID,
        Row_num: row,
        Col_num: col,
        ClassType: selectedClass
      };
  
      // Store in localStorage
      localStorage.setItem('currentBooking', JSON.stringify(seatDetails));
  
      try {
        // Make API call to update seat status
        const response = await axios.post(
          `http://localhost:5174/schedule/details/${FLight_ID}`,
          [seatDetails] // API expects an array of seat objects
        );
  
        if (response.data.success) {
          setConfirmBooking(true); // Show confirmation modal
        } else {
          alert("Failed to reserve seat. Please try again.");
        }
      } catch (error) {
        console.error("Error reserving seat:", error);
        alert(error.response?.data?.error || "Failed to reserve seat. Please try again.");
      }
    } else {
      alert("Please select a class and a seat before proceeding.");
    }
  };

  const confirmAndNavigate = () => {
    setConfirmBooking(false); // Hide modal
    const seatDetails = JSON.parse(localStorage.getItem('currentBooking'));
    
    navigate("/passenger-info", {
      state: {
        FLight_ID: seatDetails.Flight_ID,
        selectedClass: seatDetails.ClassType,
        selectedSeat: `${seatDetails.Row_num},${seatDetails.Col_num}`,
      },
    });
  };

  const econRows = object[0]?.EconomyRows;
  const goldRows = object[1]?.BusinessRows;
  const platRows = object[2]?.PlatinumRows;
  const platPrice = object[2]?.Price;
  const goldPrice = object[1]?.Price;
  const econPrice = object[0]?.Price;

//   console.log(econRows)


  const renderSeatNumbers = () => {

    const seatRows = {

      Platinum: { rows: platRows, columns: 10 },
      Gold: { rows: goldRows, columns: 10 },
      Economy: { rows: econRows, columns: 10 },
    };

      const { rows, columns } = seatRows[selectedClass || 'Platinum'];
      return (
        <div className="flex-col w-2/3 m-4 rounded-2xl justify-center items-center">
          <SeatCollection rows={rows} columns={columns} FLight_ID={FLight_ID} selectedClass={selectedClass} onSeatSelect={handleSeatSelect}/>
        </div>
      );
  };

  return (
    <section className="bg-[#131313] min-h-screen flex items-center justify-center mt-10 overflow-y-hidden">
      <Navbar />
      <div className="bg-white/10 backdrop-blur-md to-black flex rounded-2xl shadow-lg items-center px-10 mt-10 mb-100">
        <div className="flex-col w-1/3">
          <div className="w-full my-4 py-0">
            <h5 className="text-center px-12 py-10 font-medium text-2xl">AirCraft Model</h5>
            <h6></h6>
          </div>

          <div className="w-full px-5 py-3">
            <div
              className={`w-full px-5 py-5 items-center ${selectedClass === "Platinum"
                ? "bg-blue-800"
                : "bg-blue-400 hover:bg-blue-400"
                } rounded-2xl `}
              onClick={() => handleClassSelection("Platinum")}
            >
              <h4 className="text-lg block">Platinum Class</h4>
              <h4 className="text-lg block">{`Price: $${platPrice}`}</h4>
            </div>
            <div
              className={`w-full px-5 py-5 items-center ${selectedClass === "Gold"
                ? "bg-blue-800"
                : "bg-blue-400 hover:bg-blue-400"
                } my-5 rounded-2xl`}
              onClick={() => handleClassSelection("Gold")}
            >
              <h4 className="text-lg block">Gold Class<br /></h4>
              <h4 className="text-lg block">{`Price : $${goldPrice}`}</h4>
            </div>
            <div
              className={`w-full px-5 py-5 items-center ${selectedClass === "Economy"
                ? "bg-blue-800"
                : "bg-blue-400 hover:bg-blue-400"
                } rounded-2xl`}
              onClick={() => handleClassSelection("Economy")}
            >
              <h4 className="text-lg block">Economy Class</h4>
              <h4 className="text-lg block">{`Price: $${econPrice}`}</h4>
            </div>
          </div>

          <div className="flex justify-center px-5 mb-2 py-6">
            <button
              type="button"
              onClick={() => handleProceed()}
              className="bg-[#F97827] px-10 py-5 rounded-full border-black border-solid text-white font-medium text-xl"
            >
              Proceed
            </button>
          </div>
        </div>
        {renderSeatNumbers()}
        {confirmBooking && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 text-black">
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-lg font-semibold">Confirm Booking</h2>
              <p className="mt-2">Are you sure you want to proceed with this booking?</p>
              <div className="flex justify-end mt-4">
                <button onClick={() => setConfirmBooking(false)} className="bg-gray-300 px-4 py-2 rounded mr-2">Cancel</button>
                <button onClick={confirmAndNavigate} className="bg-[#F97827] text-white px-4 py-2 rounded hover:bg-[#D34827]">Confirm</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}


export default Seats;
