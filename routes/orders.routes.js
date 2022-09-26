const express = require('express');

const {
    createOrder,
    allOrderByUser,
    updateOrder,
    deleteOrder,
} = require('../controllers/orders.controllers');
const { checkOrder } = require('../middlewares/orders.middlewares');

const orderRouter = express.Router();



orderRouter.post('/', createOrder);
orderRouter.get('/me', allOrderByUser);
orderRouter.patch('/:id',checkOrder, updateOrder);
orderRouter.delete('/:id',checkOrder, deleteOrder);

module.exports = {
    orderRouter,
};
