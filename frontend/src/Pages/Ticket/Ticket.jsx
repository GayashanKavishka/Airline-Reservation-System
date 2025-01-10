import React, { useState, useEffect } from "react";
import "./Ticket.css";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
  const [TicketID, setTicketID] = useState([]);

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
    setTicketID(
      Ticketdetails.map((ticket)=>{
           return ticket.Ticket_ID
      }
     )
 )
  }, [Ticketdetails]);

  const Handlepay = () => {
      if(TicketID.length > 0){
        console.log("Ticket_Id",TicketID);
        const requests = TicketID.map((id) => {
          return axios.put(`http://localhost:5174/reservation/makeTicketPaid?Ticket_ID=${id}`);
        });
        Promise.all(requests)
        .then((res)=>{
            console.log("Paid Successfully",res);
            alert("Payment Successful");
        })
        .catch((err)=>{
            console.log("Error in Payment",err);
            alert("Payment Unsuccessful");
        })
      }
  };


  const DeleteTicket =(Ticket_ID,ClassType,Seat_num)=>{
    axios.delete(`http://localhost:5174/reservation/undoBooking/undoTicket?Ticket_ID=${Ticket_ID}`)
    .then((res)=>{
        console.log("Deleted Successfully",res);
        alert("Ticket Cancelled Successfully");
        const s = `${ClassType}-${Seat_num}`;
        console.log("Seat",s);
        console.log(Ticket_ID,ClassType,Seat_num);
        const duplicateselectedSeats = selectedSeats.filter((seat) => {
          return seat !== s;
        });
        console.log("duplicateselectedSeats",duplicateselectedSeats);
        // console.log("Duplicate Seats",duplicateselectedSeats);
        // const duplicateselectedSeats = selectedSeats;
        const flight_ID = flight;
        const prices = Prices;
        navigate("/ticket",{state:{duplicateselectedSeats,flight_ID,prices}});

    })
    .catch((err)=>{
        console.log("Error in Deleting",err);
    })
  }


  const showTickets = () => {
    if(selectedSeats.length === 0){
      return <h1 style={{fontSize: "20px",fontWeight:"500",color:"red"}}>No Tickets Available</h1>
    }    
    else{
          return Ticketdetails.map((ticket) => (
            <div className="ticket-card" key={ticket.Ticket_ID}>
              <h1 style ={{fontSize:"20px",fontWeight:"800"}}><strong>Ticket ID: </strong>{ticket.Ticket_ID}</h1>
              <div className="passenger-info">
                <h2>Passenger Details</h2>
                <div style={{display: "flex", gap: "20px"}}>
                <p><strong>Name:</strong> {ticket.FirstName}  {ticket.SecondName}</p>
                {ticket.Reward_class !== null ?(<p><strong>Reward Class: </strong>{ticket.Reward_class}</p>):(<p></p>)}
                </div>
                <p><strong>Gender:</strong> {ticket.gender}</p>
              </div>
              <div className="flight-info">
                <h2>Flight Details</h2>
                <p><strong>Flight ID:</strong> {ticket.Flight_ID}</p>
                <p><strong>Departure:</strong> {ticket.Departure}</p>
                <p><strong>Arrival:</strong> {ticket.Arrival}</p>
                <p><strong>Class:</strong> {ticket.ClassType}</p>
                <div style={{display: "flex", gap: "20px"}}>
                <p><strong>Price:</strong> {ticket.Price}</p>
                {ticket.Discount !== null ?(<p><strong>Discount:</strong>{ticket.Discount}</p>):(<p><strong>Discount:</strong> No discount </p>)}
                </div>
                
              </div>
              <div >
                  <button className="cancel-button"
                    onClick = {()=>DeleteTicket(ticket.Ticket_ID,ticket.ClassType,ticket.seat_num)}
                  >
                      Cancel
                  </button>
              </div>
            </div>
          ));
        }
  };

  return (
    <div >
    <div className="ticket-container">
      {selectedSeats.length > 1 ?(<h1 className="oluwa">My Tickets</h1>):(<h1 className="oluwa">My Ticket</h1>)}
      {Ticketdetails.length > 0 ? (
        <>{showTickets()}</>
      ) : (
        <h1>Loading...</h1>
      )}
      <div>
        <button className="pay" onClick={Handlepay}>
            Pay now
        </button>
      </div>
    </div>
    {selectedSeats.length === 0 ?(<div className="back-button">
      <button className="back" onClick={() => navigate("/")}>
        Back  <i class="fa fa-arrow-left" style={{fontSize:"1px"}}></i>
      </button>
    </div>):
    (<h1></h1>)}
    </div>
  );
};

export default Ticket;
