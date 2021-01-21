const express = require("express");
const { validate } = require("express-validation");
const asyncHandler = require("express-async-handler");

const controllers = require("./app/controllers");
const validators = require("./app/validators");
const middlewares = require("./app/middlewares");

const { Router } = express;

const router = new Router();

router.post(
  "/users",
  validate(validators.User),
  asyncHandler(controllers.UserController.store)
);
router.post(
  "/sessions",
  validate(validators.Session),
  asyncHandler(controllers.SessionController.store)
);
router.post(
  "/collaborators",
  validate(validators.Collaborator),
  asyncHandler(controllers.CollaboratorController.store)
);

// all routes below must have to receive the access token
router.use(middlewares.auth);

router.get(
  "/collaborators",
  asyncHandler(controllers.CollaboratorController.list)
);

router.post(
  '/recognitions',
  validate(validators.Recognition),
  asyncHandler(controllers.RecognitionController.store)
);

router.get('/dashboard', asyncHandler(controllers.DashboardController.index));
router.get('/timeline', asyncHandler(controllers.TimelineController.index));

module.exports = router;
