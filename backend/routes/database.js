const express = require('express');
const { createTables } = require('../database/migrations/places_mig');

// Create a router
const router = express.Router();

// Route to create database tables
router.post('/create-tables', async (req, res) => {
  try {
    const success = await createPlacesTable();
    if (success) {
      return res.json({ 
        success: true, 
        message: 'Database tables created successfully!' });
    }
    return res.status(500).json({ 
        success: false, 
        message: 'Failed to create database tables' });
  } 
  catch (error) {
    console.error('Error in create-tables route:', error);
    return res.status(500).json({ 
        success: false, 
        message: 'Error creating database tables', error: error.message });
  }
});

module.exports = router;