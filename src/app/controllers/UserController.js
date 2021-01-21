const User = require('../models/UserModel');

class UserController {
    async store(request, response) {
        const { _id, username } = await User.create(request.body);
        return response.json({ _id, username });
    }
}

module.exports = new UserController();
