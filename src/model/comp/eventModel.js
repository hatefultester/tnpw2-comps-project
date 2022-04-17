const mongoose = require('mongoose');


const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rounds: { type: [mongoose.Schema.Types.ObjectId], ref: 'roundSchema' }
});

module.exports = mongoose.model('event', eventSchema);