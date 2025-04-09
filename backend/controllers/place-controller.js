const { placeModel } = require('../models/places');
const supabase = require('../config/supabase');

const getAllPlace = async () => {
    try {
        return await placeModel.getAllPlace();
    }
    catch (err) {
        console.error('Error fetching all places:', err);
        throw err;
    }
}

const getPlaceById = async (placeId) => {
    try {
        return await placeModel.getPlaceById(placeId);
    }
    catch (err) {
        console.error('Error fetching place by ID:', err);
        throw err;
    }
}


module.exports = {
    getAllPlace,
    getPlaceById
};