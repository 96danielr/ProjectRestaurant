const { Restaurants } = require('../models/restaurants.model');
const { Reviews } = require('../models/reviews.model');

const createRestaurants = async (req, res) => {
    try {
        const { name, adress, rating } = req.body;

        const newRestaurant = await Restaurants.create({
            name,
            adress,
            rating,
        });

        // 201 -> Success and a resource has been created
        res.status(201).json({
            status: 'success',
            data: { newRestaurant },
        });
    } catch (error) {
        console.log(error);
    }
};

const getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurants.findAll();
        res.status(200).json({
            status: 'Active',
            data: { restaurants },
        });
    } catch (error) {}
};
const getRestaurantById = async (req, res) => {
    try {
        const { id } = req.params;

        const restaurants = await Restaurants.findOne({
            where: { id, status: 'active' },
        });
        res.status(200).json({
            status: 'success',
            data: {
                restaurants,
            },
        });
    } catch (error) {
        console.log(error);
    }
};
const updateRestaurants = async (req, res) => {
    try {
        const { name, adress } = req.body;
        const { id } = req.params;

        //checking if the regist exists
        const registration = await Users.findOne({ where: { id } });

        if (!registration) {
            return res.status(404).json({
                status: 'erroor',
                message: 'Restaurant not found',
            });
        }

        await registration.update({ name, adress });

        res.status(200).json({
            status: 'succes',
            data: { users },
        });
    } catch (error) {
        console.log('error');
    }
};

const deleteRestaurants = async (req, res) => {
    try {
        const { restaurants } = req;

        await restaurants.update({ status: 'deleted' });

        res.status(204).json({ status: 'success' });
    } catch (error) {
        console.log(error);
    }
};

const reviewRestaurant = async (req, res) => {
    try {
        const { restaurantId } = req.params;
        const { id } = req.session;
        const { comment, rating } = req.body;

        const review = await Reviews.create({
            comment,
            rating,
            restaurantId,
            userId: id,
        });

        if (!review) {
            return res.status(404).json({
                status: 'error',
                message: 'review no found',
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                review,
            },
        });
    } catch (error) {
        console.log(error);
    }
};

const updateReviewById = async (req, res) => {
    try {
        const { id } = req.params;

        const { comment, address } = req.body;

        const review = await Reviews.findOne({
            where: { id, status: 'active' },
        });
        await review.update({ comment, address });

        res.status(200).json({
            status: 'success',
            data: {
                review,
            },
        });
    } catch (error) {
        console.log(error);
    }
};

const deleteReviewById = async (req, res) => {
    try {
        const { id } = req.params;

        const review = await Reviews.findOne({
            where: { id, status: 'active' },
        });

        if (!review) {
            return res.status(404).json({
                status: 'error',
                message: 'review no found',
            });
        }

        await review.update({ status: 'delete' });

        res.status(200).json({
            status: 'success',
            data: {
                review,
            },
        });
    } catch (error) {
        console.log(error);
    }
};
module.exports = {
    createRestaurants,
    getAllRestaurants,
    updateRestaurants,
    deleteRestaurants,
    getRestaurantById,
    reviewRestaurant,
    updateReviewById,
    deleteReviewById,
};
