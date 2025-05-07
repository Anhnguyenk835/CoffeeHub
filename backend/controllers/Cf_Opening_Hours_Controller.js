const openingHours = require('../database/models/cf_opening_hours');

// get all opening hours
const getAllOpeningHours = async (req, res) => {
    try {
        const hours = await openingHours.getAllOpeningHours();
        res.status(200).json(hours);
    } catch (error) {
        console.error('Error fetching opening hours in controllers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// get opening hours by id
const getOpeningHoursById = async (req, res) => {
    const { openingHoursId } = req.params;
    try {
        const hoursData = await openingHours.getOpeningHoursById(openingHoursId);
        if (!hoursData) {
            return res.status(404).json({ error: 'Opening hours not found' });
        }
        res.status(200).json(hoursData);
    } catch (error) {
        console.error('Error fetching opening hours by ID in controllers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// get opening hours by place id
const getOpeningHoursByPlaceId = async (req, res) => {
    const { placeId } = req.params;
    try {
        const hours = await openingHours.getOpeningHoursByPlaceId(placeId);
        res.status(200).json(hours);
    } catch (error) {
        console.error('Error fetching opening hours by place ID in controllers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// add new opening hours
const addOpeningHours = async (req, res) => {
    const newOpeningHours = req.body;
    try {
        const hoursData = await openingHours.addOpeningHours(newOpeningHours);
        res.status(201).json(hoursData);
    } catch (error) {
        console.error('Error adding opening hours in controllers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// update opening hours
const updateOpeningHours = async (req, res) => {
    const { openingHoursId } = req.params;
    const updatedOpeningHours = req.body;
    try {
        const hoursData = await openingHours.updateOpeningHours(openingHoursId, updatedOpeningHours);
        if (!hoursData) {
            return res.status(404).json({ error: 'Opening hours not found' });
        }
        res.status(200).json(hoursData);
    } catch (error) {
        console.error('Error updating opening hours in controllers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// delete opening hours
const deleteOpeningHours = async (req, res) => {
    const { openingHoursId } = req.params;
    try {
        const deletedHours = await openingHours.deleteOpeningHours(openingHoursId);
        if (!deletedHours) {
            return res.status(404).json({ error: 'Opening hours not found' });
        }
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting opening hours in controllers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllOpeningHours,
    getOpeningHoursById,
    getOpeningHoursByPlaceId,
    addOpeningHours,
    updateOpeningHours,
    deleteOpeningHours
}; 