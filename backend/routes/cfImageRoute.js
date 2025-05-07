const express = require('express');
const Router = express.Router();
const imageControllers = require('../controllers/Cf_Image_Controller');

// get all images
Router.get('/', imageControllers.getAllImages);

// get image by id
Router.get('/:imageId', imageControllers.getImageById);

// get images by place id
Router.get('/place/:placeId', imageControllers.getImagesByPlaceId);

// add new image
Router.post('/', imageControllers.addImage);

// update image
Router.put('/:imageId', imageControllers.updateImage);

// delete image
Router.delete('/:imageId', imageControllers.deleteImage);

module.exports = Router; 