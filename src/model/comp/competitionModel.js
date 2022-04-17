const mongoose = require('mongoose');

const CompetitionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: String, required: true },
    competitors: {
        type: [{
            "name": { type: String, required: true },
            "results": { type: [Number] }
        }]
    },
    shortDescription: { type: String, required: true },
    description: { type: String }
});



module.exports = mongoose.model('competition', CompetitionSchema);