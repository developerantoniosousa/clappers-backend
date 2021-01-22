const Collaborator = require('../models/CollaboratorModel');
const Event = require('../models/EventModel');

const EventsType = require('../../contants/EventsType');

class DeliveryClapController {
    async update(request, response) {
        const { leader, claps } = request.body;
        const conditions = { leader };
        const updateData = { available_claps: claps };
        const updateOptions = { multi: true, upsert: true };

        await Collaborator.updateMany(conditions, updateData, updateOptions);

        const collaborators = await Collaborator.find(conditions);

        const events = collaborators.map(collaborator => {
            return {
                content: {
                    claps
                },
                type: EventsType.START_TIME_CYCLE,
                collaborator: collaborator._id,
            }
        });
        await Event.insertMany(events);

        return response.json({ message: 'Claps were delivered with success' });
    }
}

module.exports = new DeliveryClapController();
