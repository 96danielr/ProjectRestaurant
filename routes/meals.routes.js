const express = require('express');
const { protectSession } = require('../middlewares/auth.middlewares');

const {
    createMeal,
    getAllMeals,
    getMealById,
    updateMeal,
    deleteMeal,
} = require('../controllers/meals.controllers');
const { checkRole } = require('../middlewares/restaurants.middlewares');
const { createMealValidators } = require('../controllers/validations');

const mealRouter = express.Router();

mealRouter.post('/:id', createMealValidators, createMeal);
mealRouter.get('/', getAllMeals);

mealRouter.use(protectSession);

mealRouter.get('/:id', getMealById);
mealRouter.patch('/:id', checkRole, updateMeal);
mealRouter.delete('/:id', checkRole, deleteMeal);

module.exports = {
    mealRouter,
};
