const { db } = require('../database/index');

// get all places
const getAllPlaces = async (req, res) => {
    try {
        const places = await db.raw('SELECT * FROM "Coffee_Shop"');
        res.status(200).json(places.rows);
    } catch (error) {
        console.error('Error fetching places in controllers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// get place by id
const getPlaceById = async (req, res) => {
    const { placeId } = req.params;
    try {
        const placeData = await db.raw('SELECT * FROM "Coffee_Shop" WHERE place_id = ?', [placeId]);
        if (!placeData.rows.length) {
            return res.status(404).json({ error: 'Place not found' });
        }
        res.status(200).json(placeData.rows[0]);
    } catch (error) {
        console.error('Error fetching place by ID in controllers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// add new place
const addPlace = async (req, res) => {
    const newPlace = req.body;
    try {
        // Check if place already exists
        const existingPlace = await db.raw('SELECT * FROM "Coffee_Shop" WHERE place_url = ?', [newPlace.place_url]);
        if (existingPlace.rows.length) {
            return res.status(400).json({
                success: false,
                message: 'Cf shop already existed.',
            });
        }

        const keys = Object.keys(newPlace);
        const values = Object.values(newPlace);
        const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
        
        const query = `
            INSERT INTO "Coffee_Shop" (${keys.join(', ')})
            VALUES (${placeholders})
            RETURNING *
        `;
        
        const result = await db.raw(query, values);
        res.status(201).json(result.rows[0]);
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
        const keys = Object.keys(updatedPlace);
        const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');
        
        const query = `
            UPDATE "Coffee_Shop"
            SET ${setClause}
            WHERE place_id = $${keys.length + 1}
            RETURNING *
        `;
        
        const values = [...Object.values(updatedPlace), placeId];
        const result = await db.raw(query, values);
        
        if (!result.rows.length) {
            return res.status(404).json({ error: 'Cf shop not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error updating coffee shop in controllers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// delete place
const deletePlace = async (req, res) => {
    const { placeId } = req.params;
    try {
        const result = await db.raw('DELETE FROM "Coffee_Shop" WHERE place_id = ? RETURNING *', [placeId]);
        if (!result.rows.length) {
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