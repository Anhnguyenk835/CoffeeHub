const placeType = require('../database/models/PlaceType');

// get all place types
const getAllPlaceTypes = async (req, res) => {
    try {
        const placeTypes = await placeType.getAllPlaceTypes();
        res.status(200).json(placeTypes);
    } catch (error) {
        console.error('Error fetching place types in controllers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// get place type by id
const getPlaceTypeById = async (req, res) => {
    const { placeTypeId } = req.params;
    try {
        const placeTypeData = await placeType.getPlaceTypeById(placeTypeId);
        if (!placeTypeData) {
            return res.status(404).json({ error: 'Place type not found' });
        }
        res.status(200).json(placeTypeData);
    } catch (error) {
        console.error('Error fetching place type by ID in controllers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// add new place type
const addPlaceType = async (req, res) => {
    const newPlaceType = req.body;
    try {
        const placeTypeData = await placeType.addPlaceType(newPlaceType);
        res.status(201).json(placeTypeData);
    } catch (error) {
        console.error('Error adding place type in controllers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// update place type
const updatePlaceType = async (req, res) => {
    const { placeTypeId } = req.params;
    const updatedPlaceType = req.body;
    try {
        const placeTypeData = await placeType.updatePlaceType(placeTypeId, updatedPlaceType);
        if (!placeTypeData) {
            return res.status(404).json({ error: 'Place type not found' });
        }
        res.status(200).json(placeTypeData);
    } catch (error) {
        console.error('Error updating place type in controllers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// delete place type
const deletePlaceType = async (req, res) => {
    const { placeTypeId } = req.params;
    try {
        const deletedPlaceType = await placeType.deletePlaceType(placeTypeId);
        if (!deletedPlaceType) {
            return res.status(404).json({ error: 'Place type not found' });
        }
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting place type in controllers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = {
    getAllPlaceTypes,
    getPlaceTypeById,
    addPlaceType,
    updatePlaceType,
    deletePlaceType
};