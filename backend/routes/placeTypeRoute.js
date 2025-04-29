const express = require('express');
const Router = express.Router();
const placeTypeControllers = require('../controllers/placeTypeController');

// get all place types
Router.get('/', placeTypeControllers.getAllPlaceTypes);

// get place type by id
Router.get('/:placeTypeId', placeTypeControllers.getPlaceTypeById);

// add new place type
Router.post('/', placeTypeControllers.addPlaceType);

//  update place type
Router.put('/:placeTypeId', placeTypeControllers.updatePlaceType);

// delete place type
Router.delete('/:placeTypeId', placeTypeControllers.deletePlaceType);

module.exports = Router;

