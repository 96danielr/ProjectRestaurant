const express = require('express');

// Controllers
const {
    createUser,
    getAllUsers,
    updateUsers,
} = require('../controllers/users.controllers');
const { checkUser } = require('../middlewares/users.middlewares');

//Middlewares
const usersRouter = express.Router();

usersRouter.post('/', checkUser, createUser);
usersRouter.get('/', checkUser, getAllUsers);
usersRouter.patch('/:id', updateUsers);

module.exports = { usersRouter };
