const express = require('express');
const Router = express.Router();
const placeControllers = require('../controllers/placeController');

// get all place
Router.get('/', placeControllers.getAllPlaces);

// get place by id
Router.get('/:placeId', placeControllers.getPlaceById);

// add new place
Router.post('/', placeControllers.addPlace);

// update place
Router.put('/:placeId', placeControllers.updatePlace);

// delete place
Router.delete('/:placeId', placeControllers.deletePlace);

module.exports = Router;

