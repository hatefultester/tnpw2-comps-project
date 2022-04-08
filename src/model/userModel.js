const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: { type: String, required: true, minlength: 8 },
});

module.exports = mongoose.model('user', UserSchema)