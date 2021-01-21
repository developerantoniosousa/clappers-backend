const { Joi } = require("express-validation");

const Collaborator = {
  body: Joi.object({
    name: Joi.string().min(3).required(),
    user: Joi.string(),
    leader: Joi.string(),
    avatar: Joi.string()
  }),
};

module.exports = Collaborator;
