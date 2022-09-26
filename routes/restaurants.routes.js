const express = require('express');
const { Restaurants } = require('../models/restaurants.model');
// Controllers
const {
    createRestaurants,
    getAllRestaurants,
    updateRestaurants,
    deleteRestaurants,
    updateReviewById,
    deleteReviewById,
    getRestaurantById,
    reviewRestaurant,
} = require('../controllers/restaurants.controllers');
const { createRestaurantValidators } = require('../controllers/validations');
const { checkRole, checkUserReview } = require('../middlewares/restaurants.middlewares');

//Middlewares
const restaurantsRouter = express.Router();

restaurantsRouter.post('/', createRestaurantValidators, createRestaurants);
restaurantsRouter.get('/', checkRole, getAllRestaurants);
restaurantsRouter.patch('/:id', checkRole, updateRestaurants);
restaurantsRouter.get('/:id', getRestaurantById);
restaurantsRouter.post('/reviews/:restaurantId', reviewRestaurant);
restaurantsRouter.patch('/reviews/:id',checkUserReview, updateReviewById);
restaurantsRouter.delete('/reviews/:id',checkUserReview, deleteReviewById);

module.exports = { restaurantsRouter };
