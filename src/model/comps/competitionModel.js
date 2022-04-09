const mongoose = require('mongoose');

const CompetitionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: String, required: true },
    events: { type: [mongoose.Schema.Types.ObjectId], ref: 'EventSchema' },
    competitors: { type: [mongoose.Schema.Types.ObjectId], ref: 'CompetitorSchema' },
    description: { type: String, required: true }
});


module.exports = mongoose.model('competition', CompetitionSchema);