const Event = require('../models/EventModel');

class TimelineController {
    async index(request, response) {
        const userIdLogged = request.userIdLogged;
        const events = await Event.find({ collaborator: userIdLogged }).sort({createdAt: 1});
        return response.json(events);
    }
}

module.exports = new TimelineController();
