const express = require('express');
const { testDbConnection } = require('../utils/db');


const router = express.Router();

// test Database route
router.get('/test-connection', async (req, res) => {
    const isConnected = await testDbConnection();
    if (isConnected) {
        return res.status(200).json({
            message: 'Database connection successful to Supabase',
        });
    }
    return res.status(500).json({
        message: 'Failed to connect Database to Supabase',
    })
});

module.exports = router;