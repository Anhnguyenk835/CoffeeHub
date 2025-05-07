const express = require('express');
const Router = express.Router();
const extensionControllers = require('../controllers/Cf_Extension_Controller');

// get all extensions
Router.get('/', extensionControllers.getAllExtensions);

// get extension by id
Router.get('/:extId', extensionControllers.getExtensionById);

// get extensions by place id
Router.get('/place/:placeId', extensionControllers.getExtensionsByPlaceId);

// add new extension
Router.post('/', extensionControllers.addExtension);

// update extension
Router.put('/:extId', extensionControllers.updateExtension);

// delete extension
Router.delete('/:extId', extensionControllers.deleteExtension);

module.exports = Router; 