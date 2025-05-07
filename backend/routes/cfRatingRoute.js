const express = require('express');
const Router = express.Router();
const ratingControllers = require('../controllers/Cf_Rating_Controller');

// get all ratings
Router.get('/', ratingControllers.getAllRatings);

// get rating by id
Router.get('/:ratingId', ratingControllers.getRatingById);

// get ratings by place id
Router.get('/place/:placeId', ratingControllers.getRatingsByPlaceId);

// add new rating
Router.post('/', ratingControllers.addRating);

// update rating
Router.put('/:ratingId', ratingControllers.updateRating);

// delete rating
Router.delete('/:ratingId', ratingControllers.deleteRating);

module.exports = Router; 