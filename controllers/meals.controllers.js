const { Meals } = require('../models/meals.model');
const { Restaurants } = require('../models/restaurants.model');

const createMeal = async (req, res) => {
    const { name, price } = req.body;
    const { id } = req.params;
    const meal = await Meals.create({ name, price, restaurantId: id });

    if (!meal) {
        return res.status(400).json({
            status: 'error',
            message: 'meal no create',
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            meal,
        },
    });
};

const getAllMeals = async (req, res) => {
    const meals = await Meals.findAll({
        where: { status: 'active' },
        include: [{ model: Restaurants }],
    });

    res.status(200).json({
        status: 'success',
        data: {
            meals,
        },
    });
};

const getMealById = async (req, res) => {
    const { id } = req.params;
    const meals = await Meals.findOne({
        where: { id, status: 'active' },
        include: [{ model: Restaurants }],
    });

    res.status(200).json({
        status: 'success',
        data: {
            meals,
        },
    });
};

const updateMeal = async (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;

    const meal = await Meals.findOne({ where: { id, status: 'active' } });

    if (!meal) {
        return res.status(400).json({
            status: 'error',
            message: 'meal no found ',
        });
    }
    await meal.update({ name, price });

    res.status(200).json({
        status: 'success',
        data: {
            meal,
        },
    });
};

const deleteMeal = async (req, res) => {
    const { id } = req.params;

    const meal = await Meals.findOne({ where: { id, status: 'active' } });

    if (!meal) {
        return res.status(400).json({
            status: 'error',
            message: 'meal no found ',
        });
    }
    await meal.update({ status: 'deleted' });

    res.status(200).json({
        status: 'success',
        data: {
            meal,
        },
    });
};

module.exports = {
    createMeal,
    getAllMeals,
    getMealById,
    updateMeal,
    deleteMeal,
};
