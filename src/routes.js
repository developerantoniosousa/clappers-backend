const express = require("express");
const { validate } = require("express-validation");
const asyncHandler = require("express-async-handler");

const authMiddleware = require("./app/middlewares/auth");

const UserController = require('./app/controllers/UserController');
const DashboardController = require('./app/controllers/DashboardController');
const DeliveryClapController = require('./app/controllers/DeliveryClapController');
const RecognitionController = require('./app/controllers/RecognitionController');
const SessionController = require('./app/controllers/SessionController');
const TimelineController = require('./app/controllers/TimelineController');
const CollaboratorController = require('./app/controllers/CollaboratorController');

const UserValidator = require('./app/validators/User');
const SessionValidator = require('./app/validators/Session');
const CollaboratorValidator = require('./app/validators/Collaborator');
const DeliveryClapValidator = require('./app/validators/DeliveryClap');
const RecognitionValidator = require('./app/validators/Recognition');

const { Router } = express;

const router = new Router();

router.post(
  "/users",
  validate(UserValidator),
  asyncHandler(UserController.store)
);
router.post(
  "/sessions",
  validate(SessionValidator),
  asyncHandler(SessionController.store)
);
router.post(
  "/collaborators",
  validate(CollaboratorValidator),
  asyncHandler(CollaboratorController.store)
);

// all routes below must have to receive the access token
router.use(authMiddleware);

router.get(
  "/collaborators",
  asyncHandler(CollaboratorController.list)
);

router.post(
  '/recognitions',
  validate(RecognitionValidator),
  asyncHandler(RecognitionController.store)
);

router.get('/dashboard', asyncHandler(DashboardController.index));
router.get('/timeline', asyncHandler(TimelineController.index));

router.put(
  '/delivery-claps',
  validate(DeliveryClapValidator),
  asyncHandler(DeliveryClapController.update)
);

module.exports = router;
