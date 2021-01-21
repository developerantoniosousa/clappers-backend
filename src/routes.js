const express = require('express');
const {validate} = require('express-validation');

const UserController = require('./app/controllers/UserController');

const validators = require('./app/validators');

const { Router } = express;

const router = new Router();

router.post('/users', validate(validators.User), UserController.store);

module.exports = router;
