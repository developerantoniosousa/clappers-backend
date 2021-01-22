const mongoose = require('mongoose');

const AchiviementModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    level: {
        type: Number,
        required: true,
    },
    collaborator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Collaborator'
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Achiviement', AchiviementModel);
