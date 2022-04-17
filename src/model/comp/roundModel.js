const mongoose = require('mongoose');


const roundSchema = new mongoose.Schema({
    "name": { type: String, required: true },
    "onward": { type: Number },
    "results": {
        type: [{
            "competitor": { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'CompetitorSchema' },
            results: { "type": [Number] },
            average: { "type": Number }
        }]
    }
});

module.exports = mongoose.model('round', roundSchema);