const image = require('../database/models/cf_image');

// get all images
const getAllImages = async (req, res) => {
    try {
        const images = await image.getAllImages();
        res.status(200).json(images);
    } catch (error) {
        console.error('Error fetching images in controllers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// get image by id
const getImageById = async (req, res) => {
    const { imageId } = req.params;
    try {
        const imageData = await image.getImageById(imageId);
        if (!imageData) {
            return res.status(404).json({ error: 'Image not found' });
        }
        res.status(200).json(imageData);
    } catch (error) {
        console.error('Error fetching image by ID in controllers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// get images by place id
const getImagesByPlaceId = async (req, res) => {
    const { placeId } = req.params;
    try {
        const images = await image.getImagesByPlaceId(placeId);
        res.status(200).json(images);
    } catch (error) {
        console.error('Error fetching images by place ID in controllers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// add new image
const addImage = async (req, res) => {
    const newImage = req.body;
    try {
        const imageData = await image.addImage(newImage);
        res.status(201).json(imageData);
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
        const imageData = await image.updateImage(imageId, updatedImage);
        if (!imageData) {
            return res.status(404).json({ error: 'Image not found' });
        }
        res.status(200).json(imageData);
    } catch (error) {
        console.error('Error updating image in controllers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// delete image
const deleteImage = async (req, res) => {
    const { imageId } = req.params;
    try {
        const deletedImage = await image.deleteImage(imageId);
        if (!deletedImage) {
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