const User = require('../models/UserModel');

class UserController {
    async store(request, response) {
        const { username } = request.body;

        if (await User.findOne({ username })) {
            return response.status(401).json({ error: 'User already exists' });
        }

        const { _id } = await User.create(request.body);
        return response.json({ _id, username });
    }
}

module.exports = new UserController();
