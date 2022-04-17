const mongoose = require('mongoose');

const CompetitorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    first: { type: Number },
    second: { type: Number },
    third: { type: Number },
    fourth: { type: Number },
    fifth: { type: Number },
    competitionId: { type: String, required: true }
});

module.exports = mongoose.model('competitor', CompetitorSchema);