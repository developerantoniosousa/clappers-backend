const Collaborator = require('../models/CollaboratorModel');

class DeliveryClapController {
    async update(request, response) {
        const { leader, claps } = request.body;
        const updateConditions = { leader };
        const updateData = { available_claps: claps };
        const updateOptions = { multi: true, upsert: true };

        await Collaborator.updateMany(updateConditions, updateData, updateOptions);

        return response.json({ message: 'Claps were delivered with success' });
    }
}

module.exports = new DeliveryClapController();
