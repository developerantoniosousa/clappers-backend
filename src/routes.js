const express = require('express');
const {validate} = require('express-validation');
const asyncHandler = require('express-async-handler');

const controllers = require('./app/controllers');
const validators = require('./app/validators');
const middlewares = require('./app/middlewares');

const { Router } = express;

const router = new Router();

router.post('/users', validate(validators.User), asyncHandler(controllers.UserController.store));

router.post('/sessions', validate(validators.Session), asyncHandler(controllers.SessionController.store));

// all routes below must have to receive the access token
router.use(middlewares.auth);

module.exports = router;
