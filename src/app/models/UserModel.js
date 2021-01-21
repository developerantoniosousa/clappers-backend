const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../../config/auth');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
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
    timestamps: true,
});

UserSchema.pre('save', async function (next) {
    if (!this.password) next();
    this.password = await bcrypt.hash(this.password, 8);
});

UserSchema.methods = {
    checkPassword(password) {
        return bcrypt.compare(password, this.password);
    }
}

UserSchema.statics = {
    generateToken({ _id }) {
        return jwt.sign({ _id }, authConfig.secret, {
            expiresIn: authConfig.expiresIn
        })
    }
}

module.exports = mongoose.model('User', UserSchema);
