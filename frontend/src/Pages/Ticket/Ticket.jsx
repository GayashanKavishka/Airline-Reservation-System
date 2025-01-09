import React, { useState, useEffect } from "react";
import "./Ticket.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Ticket = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedSeats = location.state.duplicateselectedSeats;
  const flight = location.state.flight_ID;
  const Prices = location.state.prices;

  const classType = {
    Economy: 1,
    Business: 2,
    Platinum: 3,
  };

  const [Ticketdetails, setTicketDetails] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      if (selectedSeats.length > 0) {
        const requests = selectedSeats.map((seat) => {
          const num = seat.split("-")[1];
          const type = seat.split("-")[0];
          return axios.post("http://localhost:5174/reservation/getTicketDetails", {
            seat_num: num,
            Flight_ID: flight,
            Class_ID: classType[type],
          });
        });

        const responses = await Promise.all(requests);
        setTicketDetails(responses.map((res) => res.data));
      }
    };

    fetchTickets();
  }, [selectedSeats, flight]);

  useEffect(() => {
    console.log("details", Ticketdetails);
  }, [Ticketdetails]);

  const showTickets = () => {
    return Ticketdetails.map((ticket) => (
      <div className="ticket-card" key={ticket.Ticket_ID}>
        <div className="passenger-info">
          <h2>Passenger Details</h2>
          <p><strong>Name:</strong> {ticket.FirstName}</p>
          <p><strong>Gender:</strong> {ticket.gender}</p>
        </div>
        <div className="flight-info">
          <h2>Flight Details</h2>
          <p><strong>Flight ID:</strong> {ticket.Flight_ID}</p>
          <p><strong>Departure:</strong> {ticket.Departure}</p>
          <p><strong>Arrival:</strong> {ticket.Arrival}</p>
          <p><strong>Class:</strong> {ticket.ClassType}</p>
          <p><strong>Price:</strong> {ticket.Price}</p>
        </div>
        <div >
            <button className="cancel-button" >
                Cancel
            </button>
        </div>
      </div>
    ));
  };

  return (
    <div className="ticket-container">
      <h1 className="oluwa">My Ticket</h1>
      {Ticketdetails.length > 0 ? (
        <>{showTickets()}</>
      ) : (
        <h1>Loading...</h1>
      )}
      <div>
        <button className="pay">
            Pay now
        </button>
      </div>
    </div>
  );
};

export default Ticket;
