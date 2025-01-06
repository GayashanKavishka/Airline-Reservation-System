import React, { useState, useEffect } from "react";
import axios from "axios";
import Ticket from "../components/Ticket";
import Navbar from "../components/Navbar/Navbar";

const TicketView = () => {
    const [bookingData, setBookingData] = useState(null);
    const [flightData, setFlightData] = useState(null);
    const [flightDetails, setFlightDetails] = useState(null);
    const [discountedPrice, setDiscountedPrice] = useState(null);
    const [rewardClass, setRewardClass] = useState(null);
  
    useEffect(() => {
      const storedBookingInfo = localStorage.getItem("bookingInfo");
      const storedFlightInfo = localStorage.getItem("currentBooking");
      const token = localStorage.getItem("accessToken");
      
      if (storedBookingInfo && storedFlightInfo) {
        const parsedBookingInfo = JSON.parse(storedBookingInfo);
        const parsedFlightInfo = JSON.parse(storedFlightInfo);
        setBookingData(parsedBookingInfo);
        setFlightData(parsedFlightInfo);
  
        // Fetch flight details
        axios.get(`http://localhost:5174/schedule/byID`, {
          params: { id: parsedFlightInfo.Flight_ID }
        })
          .then(response => {
            setFlightDetails(response.data);
  
            // If user is authenticated, fetch discounted price
            if (token) {
              return axios.get(`http://localhost:5174/schedule/discounted-price`, {
                params: { flightId: parsedFlightInfo.Flight_ID },
                headers: { accessToken: token }
              });
            }
          })
          .then(discountResponse => {
            if (discountResponse) {
              setDiscountedPrice(discountResponse.data.discountedPrice);
              setRewardClass(discountResponse.data.rewardClass);
            }
          })
          .catch(error => {
            console.error("Error fetching details:", error);
          });
      }
    }, []);
  
    if (!bookingData || !flightData || !flightDetails) {
      return <div>Loading...</div>;
    }
  
    return (
      <div className="flex flex-col items-center">
        <Navbar />
        <div className="h-44"></div>
        <Ticket
          flightID={flightData.Flight_ID}
          firstName={bookingData.passengerInfo.fname}
          lastName={bookingData.passengerInfo.lname}
          seatID={`Row: ${flightData.Row_num} Column: ${flightData.Col_num}`}
          classType={flightData.ClassType}
          email={bookingData.passengerInfo.email}
          phone={bookingData.passengerInfo.phone}
          address={`${bookingData.passengerInfo.address}, ${bookingData.passengerInfo.city}`}
          departureTime={flightDetails.Departure_date_time}
          arrivalTime={flightDetails.Expected_arrival_date_time}
          price={discountedPrice || flightDetails.Flight_price}
          departureAirport={flightDetails.Departure_Airport}
          arrivalAirport={flightDetails.Arrival_Airport}
          rewardClass={rewardClass}
        />
      </div>
    );
  };
export default TicketView;