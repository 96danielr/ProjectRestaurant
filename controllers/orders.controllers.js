const { Meals } = require('../models/meals.model');
const { Orders } = require('../models/orders.model');
const { Restaurants } = require('../models/restaurants.model');

const createOrder = async (req, res) => {
    const { quantity, mealId } = req.body;
    const { id } = req.session;
    const meal = await Meals.findOne({ where: { id: mealId } });
    if (!meal) {
        return res.status(400).json({
            status: 'error',
            message: 'meal no found',
        });
    }
    const order = await Order.create({
        quantity,
        totalPrice: quantity * meal.price,
        userId: id,
        mealId: mealId,
    });
    res.status(200).json({
        status: 'success',
        data: {
            order,
        },
    });
};

const allOrderByUser = async (req, res) => {
    const { id } = req.session;
    const orders = await Orders.findOne({
        where: { userId: id, status: 'active' },
        include: [{ model: Meals, include: { model: Restaurants } }],
    });

    res.status(200).json({
        status: 'success',
        data: {
            orders,
        },
    });
};

const updateOrder = async (req, res) => {
    const { id } = req.params;

    const order = await Orders.findOne({ where: { id, status: 'active' } });
    if (!order) {
        return res.status(400).json({
            status: 'error',
            message: 'order no found',
        });
    }
    await order.update({ status: 'completed' });
    res.status(200).json({
        status: 'success',
        data: {
            order,
        },
    });
};

const deleteOrder = async (req, res) => {
    const { id } = req.params;

    const order = await Orders.findOne({ where: { id, status: 'active' } });
    if (!order) {
        return res.status(400).json({
            status: 'error',
            message: 'order no found',
        });
    }
    await order.update({ status: 'deleted' });
    res.status(200).json({
        status: 'success',
        data: {
            order,
        },
    });
};

module.exports = {
    createOrder,
    allOrderByUser,
    updateOrder,
    deleteOrder,
};
