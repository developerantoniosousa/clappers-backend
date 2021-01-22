const Event = require('../models/EventModel');
const Collaborator = require('../models/CollaboratorModel');
const Achieviment = require('../models/AchiviementModel');

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

        // updating total claps for sender and receiver
        sender.available_claps -= claps;
        receiver.own_claps += claps;
        await sender.save();
        await receiver.save();

        // saving the achieviment when someone is recognized
        const achieviment = await Achieviment.findOne({ collaborator: receiver_id, name: category_type });
        if (!achieviment) {
            const level = 1;
            const newAchieviment = await Achieviment.create({ collaborator: receiver_id, name: category_type, level });

            // registering achieviment event
            await Event.create({
                content: {
                    category_type,
                    level
                },
                type: EventsType.ACHIEVEMENT_BADGE,
                collaborator: receiver_id
            });
        }

        // registering events
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
