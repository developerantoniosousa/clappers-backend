const Event = require('../models/EventModel');
const Collaborator = require('../models/CollaboratorModel');

const EventsType = require('../../contants/EventsType');

class RecognitionController {
    async store(request, response) {
        const { receiver_id, category_type } = request.body;
        const claps = Math.abs(request.body.claps);
        const senderId = request.userIdLogged;

        const sender = await Collaborator.findOne({ user: senderId });
        const receiver = await Collaborator.findOne({ user: receiver_id });

        if (!receiver) {
            return response.status(404).json({ error: 'Receiver not found' });
        }

        const isThereEnoughClaps = sender.available_claps > claps;
        if (!isThereEnoughClaps) {
            return response.status(400).json({ error: 'You do not have enough claps available' });
        }

        sender.available_claps -= claps;
        receiver.own_claps += claps;
        await sender.save();
        await receiver.save();

        await Event.create({
            content: {
                claps,
                target_user: {
                    _id: receiver_id,
                    name: receiver.name
                },
                category_type
            },
            type: EventsType.CLAP_SENT,
            collaborator: senderId
        });

        await Event.create({
            content: {
                claps,
                category_type,
            },
            type: EventsType.CLAP_RECEIVED,
            collaborator: receiver_id
        });

        return response.json({ message: 'Recognition made with successfully' });
    }
}

module.exports = new RecognitionController();
