const { Orders } = require('./orders.model');
const { Users } = require('./users.model');
const { Restaurants } = require('./restaurants.model');
const { Meals } = require('./meals.model');
const { Reviews } = require('./reviews.model');

const initModels = () => {
    // 1 - 1

    Meals.hasOne(Order, { foreignKey: 'mealId' });
    Orders.belongsTo(Meals);

    // 1 - M

    Users.hasMany(Orders, { foreignKey: 'userId' });
    Orders.belongsTo(Users);

    Restaurants.hasMany(Meals, { foreignKey: 'restaurantId' });
    Meals.belongsTo(Restaurants);

    Restaurants.hasMany(Reviews, { foreignKey: 'restaurantId' });
    Reviews.belongsTo(Restaurants);

    Users.hasMany(Reviews, { foreignKey: 'userId' });
    Reviews.belongsTo(Users);
};
module.exports = {
    initModels,
};
