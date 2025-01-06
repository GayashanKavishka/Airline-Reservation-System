// routes/Route.js
const express = require('express');
const router = express.Router();
const {  insertRoute, fetchAllRoutes,AddRoute } = require('../models/Route');

// Example route to get all routes
// router.get('/all', (req, res) => {
//        try {
//         const routes = fetchAllRoutes();
//         console.log(routes);
//         res.json(routes);
//     } catch (error) {
//         console.error('Error fetching routes:', error);
//         res.status(500).json({ error: "Failed to fetch routes." });
//     }
//     });

// Example route to add a route
router.post('/', (req, res) => {
    const { Route_ID, Arrival_Airport_ID, Departure_Airport_ID, Distance } = req.body;
    try {
        insertRoute(Route_ID, Arrival_Airport_ID, Departure_Airport_ID, Distance);
        res.json({ message: "Route created successfully!" });
    } catch (error) {  
        console.error('Error creating route:', error);
        res.status(500).json({ error: "Failed to create route." });
    }
    
});

router.post('/addRoute', (req, res) => {
    const Arrival_Airport_ID = req.body.Arrival_airport_ID;
    const Departure_Airport_ID = req.body.Departure_airport_ID;
    const Distance = req.body.Distance
    try {
        AddRoute( Departure_Airport_ID,Arrival_Airport_ID, Distance);
        res.json({ message: "Route created successfully!" });
    } catch (error) {  
        console.error('Error creating route:', error);
        res.status(500).json({ error: "Failed to create route." });
    }
    
});

router.get('/allroutes', async (req, res) => {
    try {
        const routes = await fetchAllRoutes(); // Await the promise
        console.log(routes); // Log the results for debugging
        // Check if results are not empty and return the first result set
        if (routes.length > 0 && routes[0].length > 0) {
            res.json(routes[0]); // Send the first result set back as JSON
        } else {
            res.status(404).json({ message: "No routes found." });
        }
    } catch (error) {
        console.error('Error fetching routes:', error);
        res.status(500).json({ error: "Failed to fetch routes." });
    }
})

module.exports = router;
