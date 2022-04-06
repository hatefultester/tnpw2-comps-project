const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    event_name: { type: String, unique: true },
    rounds: [RoundSchema]
});

const RoundSchema = new mongoose.Schema({
    name: { type: String, required: true },
    competitors: {
        type: [
            [CompetitorSchema, AttemptsSchema]
        ]
    },
    advancing: { type: Number, required: true },
    status: StatusSchema
});

const AttemptsSchema = new mongoose.Schema({
    results: { type: [Number], maxlength: 5 }
});

const CompetitorSchema = new mongoose.Schema({
    competitor_name: { Type: String, required: true },
    registred_events: { Type: [String], required: true },
    status: { type: Boolean, default: false }
});

const StatusSchema = new mongoose.Schema({
    type: String,
    enum: ['Completed', 'Pending', 'Running'],
    default: 'Pending'
})

const CompetitionSchema = new mongoose.Schema({
    comp_name: { type: String, required: true },
    events: [EventSchema],
    competitors: [CompetitorSchema],
    status: StatusSchema
});

module.exports = mongoose.model('competition', CompetitionSchema)