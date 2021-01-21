const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password_hash: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: 'common'
    }
}, {
    timestamp: true,
});

module.exports = mongoose.model('Collaborator', UserSchema);
