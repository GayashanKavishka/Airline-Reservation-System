const express = require('express');
const router = express.Router();
const { rewardsQuery,GetBookingsByRewardClass } = require('../models/Rewards');


router.get('/rewardsQuery', async (req, res) => {
});


router.post('/rewardsQuery', async (req, res) => {
    const { RewardClass, RewardPoints } = req.body;
    try {
        const reward = await rewardsQuery(RewardClass, RewardPoints);
        res.json(reward);
    } catch (error) {
        console.error("Error fetching rewards: ", error);
        res.json({ error: error.message });
    }
});

router.get('/admin/report1', async (req, res) => {
    const start_date = req.query.start_date;
    const end_date = req.query.end_date;
    try {
        const bookings = await GetBookingsByRewardClass(start_date, end_date);
        res.json(bookings);
    } catch (error) {
        console.error("Error fetching bookings: ", error);
        res.json({ error: error.message });
    }
});

router.put('/admin/report1', async (req, res) => {
});



module.exports = router;