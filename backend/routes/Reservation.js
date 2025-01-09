const express = require("express");
const router = express.Router();
const { insertReservation, getReservationById, deleteReservation,InsertPassangers,MakeATicket ,GetTicketDetails} = require("../models/Reservation");

router.post("/", async (req, res) => {
    const { planeId, userId, date, seatNumber } = req.body;

    if (!planeId || !userId || !date || !seatNumber) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        await insertReservation(planeId, userId, date, seatNumber);
        res.json({ message: "Reservation created successfully!" });
    } catch (error) {
        console.error('Error creating reservation:', error);
        res.status(500).json({ error: "Failed to create reservation." });
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const reservation = await getReservationById(id);

        if (!reservation) {
            return res.status(404).json({ error: "Reservation not found." });
        }

        res.json(reservation);
    } catch (error) {
        console.error('Error fetching reservation:', error);
        res.status(500).json({ error: "Failed to fetch reservation." });
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const result = await deleteReservation(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Reservation not found." });
        }

        res.json({ message: "Reservation deleted successfully!" });
    } catch (error) {
        console.error('Error deleting reservation:', error);
        res.status(500).json({ error: "Failed to delete reservation." });
    }
});



router.post("/insertPassanger",(req,res)=>{
    const passangerData = req.body;
    console.log(passangerData);
    InsertPassangers(passangerData)
    .then((result)=>{
        res.status(200).json({message:"Passanger inserted successfully"});
    })
    .catch((err)=>{
        console.error('Error inserting passanger:', err);
        res.status(500).json({ error: "Failed to insert passanger." });
    })

})

router.post("/make_a_ticket",(req,res)=>{

    const{Class_ID,Flight_ID,seat_price,seat_num,Passenger_ID} = req.body;
    console.log(Class_ID,Flight_ID,seat_price,seat_num,Passenger_ID);
    MakeATicket(Class_ID,Flight_ID,seat_price,seat_num,Passenger_ID)
    .then((result)=>{
        res.status(200).json({message:"Ticket Created Successfully"});
    }).catch((err)=>{
        console.error('Error creating ticket:', err);
        res.status(500).json({ error: "Failed to create ticket." });
    })
    

});

router.post("/getTicketDetails",(req,res)=>{
    const{Class_ID,Flight_ID,seat_num} = req.body;
    console.log(Class_ID,Flight_ID,seat_num);
    GetTicketDetails(Flight_ID,seat_num,Class_ID)
    .then((result)=>{
        res.status(200).json(result[0][0]);
    })
    .catch((err)=>{
        console.error('Error fetching ticket details:', err);
        res.status(500).json({ error: "Failed to fetch ticket details." });
    })
})

module.exports = router;
