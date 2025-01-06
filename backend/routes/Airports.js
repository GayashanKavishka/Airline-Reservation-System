const express = require("express");
const router = express.Router();
const {countAirports ,fetchAllAirports,getAllAirportsShortCode,fetchAllCountries,insertAirport} = require("../models/Airports");


router.get('/count', async (req, res) => {
    try {
        const count = await countAirports();
        res.json(count);
    } catch (err) {
        console.error('Error counting airports:', err);
        res.status(500).json({ error: "Failed to fetch airports." });
    }
});


router.post('/', async (req, res) => {
    const { Airport_ID, Airport_Name, City, Country } = req.body;

    if (!Airport_ID || !Airport_Name || !City || !Country) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        await insertAirport(Airport_ID, Airport_Name, City, Country);
        res.json({ message: "Airport created successfully!" });
    } catch (error) {
        console.error('Error creating airport:', error);
        res.status(500).json({ error: "Failed to create airport." });
    }
}
);

router.get('/airport/all',async(req,res)=>{
    try{
        const airports = await fetchAllAirports();
        res.json(airports);
    }
    catch(err)
    {
        console.error('Error fetching airports:', err);
        res.status(500).json({ error: "Failed to fetch airports." });
    }
})

router.get('/airport/shortcodes',async(req,res)=>{
    try{
        const airports = await getAllAirportsShortCode();
        res.json(airports);
    }
    catch(err)
    {
        console.error('Error fetching airports:', err);
        res.status(500).json({ error: "Failed to fetch airports." });
    }
})

router.get('/countries',async(req,res)=>{
    try{
        const countries = await fetchAllCountries();
        res.json(countries);
    }
    catch(err)
    {
        console.error('Error fetching countries:', err);
        res.status(500).json({ error: "Failed to fetch countries." });
    }
})

router.post('/insertAirport', async (req, res) => {
    const { Short_code, name, Country, State, city } = req.body;

    if (!Short_code || !name || !Country || !State || !city) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        await insertAirport(Short_code, name, Country, State, city);
        res.json({ message: "Airport created successfully!" });
    } catch (error) {
        console.error('Error creating airport:', error);
        res.status(500).json({ error: "Failed to create airport." });
    }
}
);


module.exports = router;