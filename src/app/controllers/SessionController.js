const User = require('../models/UserModel');

class SessionController {
    async store(request, response) {
        const { username, password } = request.body;

        const user = await User.findOne({ username });

        if (!user) {
            return response.status(401).json({ error: 'User not found' });
        }

        if (!(await user.checkPassword(password))) {
            return response.status().json({ error: 'Password does not match' });
        }

        const { _id } = user;

        return response.json({ user: { _id, username }, token: User.generateToken(user) });
    }
}

module.exports = new SessionController();
