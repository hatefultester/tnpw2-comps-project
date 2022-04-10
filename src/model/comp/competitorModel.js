const mongoose = require('mongoose');


const CompetitorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    registered: { type: Boolean, default: false },
    event_list: { type: [Boolean], required: true }
});

module.exports = mongoose.model('competitor', CompetitorSchema);