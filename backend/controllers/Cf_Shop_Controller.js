const place = require('../database/models/cf_shop');

// get all places
const getAllPlaces = async (req, res) => {
    try {
        const places = await place.getAllPlaces();
        res.status(200).json(places);
    } catch (error) {
        console.error('Error fetching places in controllers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// get place by id
const getPlaceById = async (req, res) => {
    const { placeId } = req.params;
    try {
        const placeData = await place.getPlaceById(placeId);
        if (!placeData) {
            return res.status(404).json({ error: 'Place not found' });
        }
        res.status(200).json(placeData);
    } catch (error) {
        console.error('Error fetching place by ID in controllers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// add new place
const addPlace = async (req, res) => {
    const newPlace = req.body;
    try {
        const { placeData, error } = await place.addPlace(newPlace);
        if (error) {
            // Check same value
            if (error.message.includes('Cf Shop already exists')) {
                return res.status(400).json({
                    success: false,
                    message: 'Cf shop already existed.',
                });
            }
            throw error;
        }
        res.status(201).json(placeData);
    } catch (error) {
        console.error('Error adding cf shop in controllers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// update place
const updatePlace = async (req, res) => {
    const { placeId } = req.params;
    const updatedPlace = req.body;
    try {
        const placeData = await place.updatePlace(placeId, updatedPlace);
        if (!placeData) {
            return res.status(404).json({ error: 'Cf shop not found' });
        }
        res.status(200).json(placeData);
    } catch (error) {
        console.error('Error updating coffee shop in controllers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// delete place
const deletePlace = async (req, res) => {
    const { placeId } = req.params;
    try {
        const deletedPlace = await place.deletePlace(placeId);
        if (!deletedPlace) {
            return res.status(404).json({ error: 'Coffee shop not found' });
        }
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting Coffee shop in controllers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = {
    getAllPlaces,
    getPlaceById,
    addPlace,
    updatePlace,
    deletePlace
};