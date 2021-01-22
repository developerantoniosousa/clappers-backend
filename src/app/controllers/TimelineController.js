const Collaborator = require('../models/CollaboratorModel');
const Event = require('../models/EventModel');

class TimelineController {
    async index(request, response) {
        const userIdLogged = request.userIdLogged;

        const collaborator = await Collaborator.findOne({ user: userIdLogged });

        const events = await Event.find({ collaborator: collaborator._id });
        return response.json(events);
    }
}

module.exports = new TimelineController();
