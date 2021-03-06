const mongoose = require('mongoose');

const CompetitionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: String, required: true },
    events: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'CompetitorSchema'
    },
    competitors: { type: [mongoose.Schema.Types.ObjectId], ref: 'CompetitorSchema' },
    shortDescription: { type: String, required: true },
    description: { type: String }
});



module.exports = mongoose.model('competition', CompetitionSchema);