const mongoose = require('mongoose');


const CompetitorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    registered: { type: Boolean, default: false },
    // neni doreseno na jake eventy jde ten curak TODO
});

const ResultSchema = new mongoose.Schema({
    competitor: { type: moongose.Schema.Types.ObjectId, required: true, ref: 'CompetitorSchema' },
    results: { type: [Number].length(5) },
    average: { type: Number }
});

const EventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    onward: { type: Number },
    results: { type: [moongose.Schema.Types.ObjectId], ref: 'ResultSchema' },
});

const CompetitionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    events: { type: [mongoose.Schema.Types.ObjectId], ref: 'EventSchema' },
    competitors: { type: [mongoose.Schema.Types.ObjectId], ref: 'CompetitorSchema' },
    description: { type: String, required: true }
});


module.exports = mongoose.model('competition', CompetitionSchema)