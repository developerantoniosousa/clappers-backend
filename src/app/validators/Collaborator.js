const { Joi } = require("express-validation");

const Collaborator = {
  body: Joi.object({
    name: Joi.string().min(3).required(),
  }),
};

module.exports = Collaborator;
