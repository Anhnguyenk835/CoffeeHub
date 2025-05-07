const rating = require('../database/models/cf_rating');

// get all ratings
const getAllRatings = async (req, res) => {
    try {
        const ratings = await rating.getAllRatings();
        res.status(200).json(ratings);
    } catch (error) {
        console.error('Error fetching ratings in controllers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// get rating by id
const getRatingById = async (req, res) => {
    const { ratingId } = req.params;
    try {
        const ratingData = await rating.getRatingById(ratingId);
        if (!ratingData) {
            return res.status(404).json({ error: 'Rating not found' });
        }
        res.status(200).json(ratingData);
    } catch (error) {
        console.error('Error fetching rating by ID in controllers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// get ratings by place id
const getRatingsByPlaceId = async (req, res) => {
    const { placeId } = req.params;
    try {
        const ratings = await rating.getRatingsByPlaceId(placeId);
        res.status(200).json(ratings);
    } catch (error) {
        console.error('Error fetching ratings by place ID in controllers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// add new rating
const addRating = async (req, res) => {
    const newRating = req.body;
    try {
        const ratingData = await rating.addRating(newRating);
        res.status(201).json(ratingData);
    } catch (error) {
        console.error('Error adding rating in controllers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// update rating
const updateRating = async (req, res) => {
    const { ratingId } = req.params;
    const updatedRating = req.body;
    try {
        const ratingData = await rating.updateRating(ratingId, updatedRating);
        if (!ratingData) {
            return res.status(404).json({ error: 'Rating not found' });
        }
        res.status(200).json(ratingData);
    } catch (error) {
        console.error('Error updating rating in controllers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// delete rating
const deleteRating = async (req, res) => {
    const { ratingId } = req.params;
    try {
        const deletedRating = await rating.deleteRating(ratingId);
        if (!deletedRating) {
            return res.status(404).json({ error: 'Rating not found' });
        }
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting rating in controllers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllRatings,
    getRatingById,
    getRatingsByPlaceId,
    addRating,
    updateRating,
    deleteRating
}; 