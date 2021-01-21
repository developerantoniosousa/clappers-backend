const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    content: {
        type: mongoose.Schema.Types.Mixed,
        required: false,
    },
    type: {
        type: String,
        required: true,
    },
    collaborator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Collaborator'
    }
}, {
    timestamp: true,
});

module.exports = mongoose.model('Event', EventSchema);
