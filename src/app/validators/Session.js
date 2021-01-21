const {Joi} = require('express-validation');

const User = {
    body: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
    }),
}

module.exports = User;
