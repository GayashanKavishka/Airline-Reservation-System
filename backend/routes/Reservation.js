const express = require("express");
const router = express.Router();
const { insertReservation, getReservationById, deleteReservation } = require('../models/Reservations');

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

module.exports = router;
