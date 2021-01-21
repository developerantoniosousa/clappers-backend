const {Joi} = require('express-validation');

const User = {
    body: Joi.object({
        leader: Joi.string().required(),
        claps: Joi.number().required(),
    }),
}

module.exports = User;
