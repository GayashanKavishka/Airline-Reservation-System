import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";


function SeatCollection(props) {
  const { rows, columns, FLight_ID, selectedClass, selectedSeatCount, onSeatSelect } = props;

  const seats = [];


  const [bookingData, setBookingData] = useState({});
  const [selectedSeat, setSelectedSeat] = useState(null);

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
    setSelectedSeat(seatKey);
    onSeatSelect(seatKey);  // Pass selected seat to parent
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
      } else if (seatKey === selectedSeat) {
        className += "bg-red-600";  // Selected seat
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

    // axios.get(`http://localhost:5174/schedule/booking/${FLight_ID}`).then((response) => {

    //   setSeatConfig(response.data);

    //   console.log(response)
    // //   console.log("dhhhL ", response.data[0].Price)
    //   setObject(response.data)
    //   setSeatConfig(response.data);
    //   console.log(object)

    });

  }, [FLight_ID])


  const handleClassSelection = (seatClass) => {
    setSelectedClass(seatClass);
  };

  const handleSeatSelect = (seat) => {
    setSelectedSeat(seat);
  };

  const handleProceed = () => {
    if (selectedClass && selectedSeat) {
      setConfirmBooking(true); // Show confirmation modal
    } else {
      alert("Please select a class and a seat before proceeding.");
    }
  };

  const confirmAndNavigate = () => {
    setConfirmBooking(false); // Hide modal
    navigate("/finalize-booking", {
      state: {
        FLight_ID,
        selectedClass,
        selectedSeat,
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
    <section className="bg-gradient-to-b from-blue-900 to-black min-h-screen flex items-center justify-center mt-10">
      <div className="bg-gradient-to-b from-blue-900 to-black flex rounded-2xl shadow-lg items-center">
        <div className="flex-col w-1/3">
          <div className="w-full my-4 py-0">
            <h5 className="text-center px-12 text-lg">AirCraft Model</h5>
            <h6></h6>
          </div>

          <div className="w-full px-5 py-3">
            <div
              className={`w-full px- py-1 ${selectedClass === "Platinum"
                ? "bg-cyan-600"
                : "bg-cyan-500 hover:bg-cyan-600"
                } rounded-2xl `}
              onClick={() => handleClassSelection("Platinum")}
            >
              <h4 className="text-lg">Platinum Class</h4>
              <h4 className="text-sm">{`Price: $${platPrice}`}</h4>
            </div>
            <div
              className={`w-full px-0 py-1 ${selectedClass === "Gold"
                ? "bg-cyan-600"
                : "bg-cyan-500 hover:bg-cyan-600 my-5"
                } my-5 rounded-2xl`}
              onClick={() => handleClassSelection("Gold")}
            >
              <h4 className="text-lg">Gold Class</h4>
              <h4 className="text-sm">{`Price: $${goldPrice}`}</h4>
            </div>
            <div
              className={`w-full px-0 py-1 ${selectedClass === "Economy"
                ? "bg-cyan-600"
                : "bg-cyan-500 hover:bg-cyan-600"
                } rounded-2xl`}
              onClick={() => handleClassSelection("Economy")}
            >
              <h4 className="text-lg">Economy Class</h4>
              <h4 className="text-sm">{`Price: $${econPrice}`}</h4>
            </div>
          </div>

          <div className="flex justify-center px-5 mb-2 py-6">
            <button
              type="button"
              onClick={handleProceed}
              className="px-12 bg-[#F97827] rounded-xl text-white py-2 hover:scale-105 duration-300"
            >
              Proceed
            </button>
          </div>
        </div>
        {renderSeatNumbers()}
        {confirmBooking && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-lg font-semibold">Confirm Booking</h2>
              <p className="mt-2">Are you sure you want to proceed with this booking?</p>
              <div className="flex justify-end mt-4">
                <button onClick={() => setConfirmBooking(false)} className="bg-gray-300 px-4 py-2 rounded mr-2">Cancel</button>
                <button onClick={confirmAndNavigate} className="bg-[#F97827] text-white px-4 py-2 rounded">Confirm</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}


export default Seats;
