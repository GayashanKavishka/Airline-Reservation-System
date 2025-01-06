const express = require('express');
const router =express.Router();
const {insertAircraft, fetchAircraftById ,fetchAllAircrafts,deleteAircraft,updateAircraft,countAircrafts,GetRevanueBYAircraftModel,TotalRevanueByEachAircraft} = require("../models/Aircrafts");
const {fetchSeatConfiguration} = require("../models/AircraftsModels");
// const connection = require('../database/connection');

router.post('/', async (req, res) => {
    const aircraft_Id =req.body.Aircraft_ID;
    const model_name = req.body.Model_name;

    try {
        const insertID = await insertAircraft(aircraft_Id,model_name);
        res.status(200).json({ message: 'Aircraft added successfully', aircraftId: insertID });


    } catch (err) {
        console.error("Error creating aircraft: ", err);
        // res.json({error: err.message});
        res.status(400).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    const aircraftId = req.params.id;
        
    try {
        // Fetch the model_id for the given aircraft
        const modelId = await fetchAircraftById(aircraftId);
        
        // Fetch the seat configuration for the given model_id
        const seatConfiguration = await fetchSeatConfiguration(modelId);
        
        // Log the seatConfiguration for debugging
        console.log("Seat Configuration:", seatConfiguration);

        // Check if seatConfiguration is an array and has at least one entry
        if (seatConfiguration && seatConfiguration.length > 0) {
            res.json({
                economySeats: seatConfiguration[0].EconomyClassSeatCount,
                businessSeats: seatConfiguration[0].BusinessClassSeatCount,
                platinumSeats: seatConfiguration[0].PlatinumClassSeatcount
            });
        } else {
            // Handle case where seat configuration is empty or undefined
            res.status(404).json({ error: 'Seat configuration not found' });
        }
        
    } catch (error) {
        console.error("Error fetching seat configuration: ", error);
        res.status(500).send({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const aircrafts = await fetchAllAircrafts();
        res.json(aircrafts);
    } catch (error) {
        console.error("Error fetching aircrafts: ", error);
        res.json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const aircraftId = req.params.id;
    
    try {
        await deleteAircraft(aircraftId);
        
        res.json({ message: 'Aircraft deleted successfully' });
    } catch (error) {
        console.error("Error deleting aircraft: ", error);
        res.json({ error: error.message });
    }
});


router.put('/:id' , async (req,res)=>{
    const aircraftId = req.params.id;
    const modelName = req.body.Model_name;
    try{
        await updateAircraft(aircraftId,modelName);
        res.json({ message: 'Aircraft updated successfully' });
    }
    catch(error)
    {
        console.error("Error deleting aircraft: ", error);
        res.json({ error: error.message });
    }
}
    
)

router.get('/count/total' ,async(req,res)=>{
   try{
        const count = await countAircrafts();
        res.json(count)

   }
   catch(error)
    {
        console.error("Error counting aircraft: ", error);
        res.json({ error: error.message });
    }


})

router.get('/admin/report4', async (req, res) => {
    const model_name = req.query.short_code;
    try {
        const revanue = await GetRevanueBYAircraftModel(model_name);
        res.json(revanue);
    } catch (error) {
        console.error("Error fetching revanue:", error);
        res.json({ error: error.message });
    }
});

router.get('/admin/report4/all', async (req, res) => {
    try {
        const revanue = await TotalRevanueByEachAircraft();
        res.json(revanue);
    } catch (error) {
        console.error("Error fetching revanue:", error);
        res.json({ error: error.message });
    }
});





module.exports = router;