const { db } = require('../database/index');

// get all images
const getAllImages = async (req, res) => {
    try {
        const images = await db.raw('SELECT * FROM "Coffee_Image"');
        res.status(200).json(images.rows);
    } catch (error) {
        console.error('Error fetching images in controllers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// get image by id
const getImageById = async (req, res) => {
    const { imageId } = req.params;
    try {
        const imageData = await db.raw('SELECT * FROM "Coffee_Image" WHERE image_id = ?', [imageId]);
        if (!imageData.rows.length) {
            return res.status(404).json({ error: 'Image not found' });
        }
        res.status(200).json(imageData.rows[0]);
    } catch (error) {
        console.error('Error fetching image by ID in controllers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// get images by place id
const getImagesByPlaceId = async (req, res) => {
    const { placeId } = req.params;
    try {
        const images = await db.raw('SELECT * FROM "Coffee_Image" WHERE place_id = ?', [placeId]);
        res.status(200).json(images.rows);
    } catch (error) {
        console.error('Error fetching images by place ID in controllers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// add new image
const addImage = async (req, res) => {
    const newImage = req.body;
    try {
        const keys = Object.keys(newImage);
        const values = Object.values(newImage);
        const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
        
        const query = `
            INSERT INTO "Coffee_Image" (${keys.join(', ')})
            VALUES (${placeholders})
            RETURNING *
        `;
        
        const result = await db.raw(query, values);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding image in controllers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// update image
const updateImage = async (req, res) => {
    const { imageId } = req.params;
    const updatedImage = req.body;
    try {
        const keys = Object.keys(updatedImage);
        const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');
        
        const query = `
            UPDATE "Coffee_Image"
            SET ${setClause}
            WHERE image_id = $${keys.length + 1}
            RETURNING *
        `;
        
        const values = [...Object.values(updatedImage), imageId];
        const result = await db.raw(query, values);
        
        if (!result.rows.length) {
            return res.status(404).json({ error: 'Image not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error updating image in controllers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// delete image
const deleteImage = async (req, res) => {
    const { imageId } = req.params;
    try {
        const result = await db.raw('DELETE FROM "Coffee_Image" WHERE image_id = ? RETURNING *', [imageId]);
        if (!result.rows.length) {
            return res.status(404).json({ error: 'Image not found' });
        }
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting image in controllers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllImages,
    getImageById,
    getImagesByPlaceId,
    addImage,
    updateImage,
    deleteImage
}; 