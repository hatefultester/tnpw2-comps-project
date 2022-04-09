const mongoose = require('mongoose');
const { modelName } = require('./competitionModel');

const ResultSchema = new mongoose.Schema({
    competitor: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'CompetitorSchema' },
    results: { type: [Number] },
    average: { type: Number }
});

module.exports = mongoose.model('result', ResultSchema);