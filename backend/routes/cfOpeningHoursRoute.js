const express = require('express');
const Router = express.Router();
const openingHoursControllers = require('../controllers/Cf_Opening_Hours_Controller');

// get all opening hours
Router.get('/', openingHoursControllers.getAllOpeningHours);

// get opening hours by id
Router.get('/:openingHoursId', openingHoursControllers.getOpeningHoursById);

// get opening hours by place id
Router.get('/place/:placeId', openingHoursControllers.getOpeningHoursByPlaceId);

// add new opening hours
Router.post('/', openingHoursControllers.addOpeningHours);

// update opening hours
Router.put('/:openingHoursId', openingHoursControllers.updateOpeningHours);

// delete opening hours
Router.delete('/:openingHoursId', openingHoursControllers.deleteOpeningHours);

module.exports = Router; 