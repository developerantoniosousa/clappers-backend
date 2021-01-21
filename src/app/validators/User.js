const {Joi} = require('express-validation');

const User = {
    body: Joi.object({
        username: Joi.string().min(8).required(),
        password: Joi.string().min(6).required(),
        role: Joi.string()
    }),
}

module.exports = User;
