const extension = require('../database/models/cf_extension');

// get all extensions
const getAllExtensions = async (req, res) => {
    try {
        const extensions = await extension.getAllExtensions();
        res.status(200).json(extensions);
    } catch (error) {
        console.error('Error fetching extensions in controllers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// get extension by id
const getExtensionById = async (req, res) => {
    const { extId } = req.params;
    try {
        const extensionData = await extension.getExtensionById(extId);
        if (!extensionData) {
            return res.status(404).json({ error: 'Extension not found' });
        }
        res.status(200).json(extensionData);
    } catch (error) {
        console.error('Error fetching extension by ID in controllers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// get extensions by place id
const getExtensionsByPlaceId = async (req, res) => {
    const { placeId } = req.params;
    try {
        const extensions = await extension.getExtensionsByPlaceId(placeId);
        res.status(200).json(extensions);
    } catch (error) {
        console.error('Error fetching extensions by place ID in controllers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// add new extension
const addExtension = async (req, res) => {
    const newExtension = req.body;
    try {
        const extensionData = await extension.addExtension(newExtension);
        res.status(201).json(extensionData);
    } catch (error) {
        console.error('Error adding extension in controllers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// update extension
const updateExtension = async (req, res) => {
    const { extId } = req.params;
    const updatedExtension = req.body;
    try {
        const extensionData = await extension.updateExtension(extId, updatedExtension);
        if (!extensionData) {
            return res.status(404).json({ error: 'Extension not found' });
        }
        res.status(200).json(extensionData);
    } catch (error) {
        console.error('Error updating extension in controllers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// delete extension
const deleteExtension = async (req, res) => {
    const { extId } = req.params;
    try {
        const deletedExtension = await extension.deleteExtension(extId);
        if (!deletedExtension) {
            return res.status(404).json({ error: 'Extension not found' });
        }
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting extension in controllers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllExtensions,
    getExtensionById,
    getExtensionsByPlaceId,
    addExtension,
    updateExtension,
    deleteExtension
}; 