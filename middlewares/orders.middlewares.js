const { Orders } = require('../models/orders.model');

const checkOrder = async (req, res, next) => {
    const { id } = req.params;
    const { session } = req;

    const order = await Orders.findOne({ where: id });
    if (!order) {
        return res.status(400).json({
            status: 'error',
            message: 'order no found',
        });
    }

    if (order.userId !== session.id) {
        return res.status(400).json({
            status: 'error',
            message: 'access denied ',
        });
    }

    next();
};
module.exports = {
    checkOrder,
};
