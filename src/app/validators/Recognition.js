const {Joi} = require('express-validation');

const User = {
    body: Joi.object({
        receiver_id: Joi.string().required(),
        category_type: Joi.string().required(),
        claps: Joi.number().required(),
    }),
}

module.exports = User;
