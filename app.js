const express = require('express');

// Routers
const { usersRouter } = require('./routes/users.routes');
const { restaurantsRouter } = require('./routes/restaurants.routes');
const { mealRouter } = require('./routes/meals.routes');
const { orderRouter } = require('./routes/orders.routes');

// Init our Express app
const app = express();

// Enable Express app to receive JSON data
app.use(express.json());

// Define endpoints
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/restaurants', restaurantsRouter);
app.use('/api/v1/meal', mealRouter);
app.use('/api/v1/order', orderRouter);

// Catch non-existing endpoints

app.all('*', (req, res) => {
    res.status(404).json({
        status: 'error',
        message: `${req.method} ${req.url} does not exists in our server`,
    });
});

module.exports = { app };
