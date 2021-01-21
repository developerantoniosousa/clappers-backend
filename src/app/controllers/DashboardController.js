const Collaborator = require('../models/CollaboratorModel');

class DashboardController {
    async index(request, response) {
        const userIdLogged = request.userIdLogged;
        const { own_claps, available_claps } = await Collaborator.findOne( {user: userIdLogged });
        return response.json({ own_claps, available_claps });
    }
}

module.exports = new DashboardController();
