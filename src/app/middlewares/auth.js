const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const authConfig = require('../../config/auth');

module.exports = async (request, response, next) => {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return response.status(401).json({ error: 'Access token not found' });
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = await promisify(jwt.verify)(token, authConfig.secret);
        request.userIdLogged = decoded._id;
        request.userRoleLogged = decoded.role;
        return next();
    } catch {
        return response.status(401).json({ error: 'Access token is invalid' });
    }
}
