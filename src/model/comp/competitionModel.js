const mongoose = require('mongoose');

const CompetitionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: String, required: true },
    events: {
        type: [{
            "name": { type: String, required: true },
            "rounds": [{
                "startDate": { type: Date, required: true },
                "endDate": { type: Date, required: true },
                "onward": { type: Number },
                "results": {
                    type: [{
                        "competitor": { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'CompetitorSchema' },
                        results: { "type": [Number] },
                        average: { "type": Number }
                    }]
                }
            }]
        }]
    },
    competitors: { type: mongoose.Schema.Types.ObjectId, ref: 'CompetitorSchema' },
    shortDescription: { type: String, required: true },
    description: { type: String }
});


module.exports = mongoose.model('competition', CompetitionSchema);