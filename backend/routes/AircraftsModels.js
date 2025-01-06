const express = require('express');
const router = express.Router();
const {insertModel,fetchAllModels,deleteModel} = require('../models/AircraftsModels');


router.post('/', async (req, res) => {
    // const { modelname, Economy, Business, Platinum } = req.body;

    const modelname = req.body.Model_name;
    const Economy = req.body.Economy_seats;
    const Business = req.body.Bussiness_seats;
    const Platinum = req.body.Platinum_seats;

    // if (!modelname || !Economy || !Business || !Platinum) {
    //     return res.json({ error: "All fields are required." });
    // }

    try {
        await insertModel(modelname, Economy, Business, Platinum);
        res.json({ message: "Model created successfully!" });
    } catch (err) {
        console.error('Error creating model:', err);
        res.status(500).json({ error: "Failed to create model." });
    }
});


router.get('/', async (req, res) => {
    try {
        const models = await fetchAllModels();
        res.json(models);
    } catch (err) {
        console.error('Error fetching models:', err);
        res.status(500).json({ error: "Failed to fetch models." });
    }
});

router.delete('/:Model_ID', async (req, res) => {
    const Model_ID = req.params.Model_ID;

    try {
        await deleteModel(Model_ID);
        res.json({ message: "Model deleted successfully!" });
    } catch (err) {
        console.error('Error deleting model:', err);
        res.status(500).json({ error: "Failed to delete model." });
    }
});








module.exports = router;