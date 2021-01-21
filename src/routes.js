const express = require('express');
const {validate} = require('express-validation');
const asyncHandler = require('express-async-handler');

const controllers = require('./app/controllers');
const validators = require('./app/validators');

const { Router } = express;

const router = new Router();

router.post('/users', validate(validators.User), asyncHandler(controllers.UserController.store));
router.post('/sessions', validate(validators.Session), asyncHandler(controllers.SessionController.store));

router.post('/collaborator', validate(validators.Collaborator), asyncHandler(controllers.CollaboratorController.store));
router.get('/collaborator', asyncHandler(controllers.CollaboratorController.list));

module.exports = router;
