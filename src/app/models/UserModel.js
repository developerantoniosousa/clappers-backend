const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
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

UserSchema.pre('save', async function (next) {
    if (!this.password) next();
    this.password_hash = await bcrypt.hash(this.password, 8);
});

module.exports = mongoose.model('User', UserSchema);
