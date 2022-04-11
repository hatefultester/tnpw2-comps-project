const mongoose = require('mongoose');


const roundSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model('competitor', roundSchema);