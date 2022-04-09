const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    onward: { type: Number },
    results: { type: [mongoose.Schema.Types.ObjectId], ref: 'ResultSchema' },
});

module.exports = mongoose.model('event', EventSchema);