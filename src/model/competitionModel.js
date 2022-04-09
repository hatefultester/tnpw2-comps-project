const mongoose = require('mongoose');


const CompetitionSchema = new mongoose.Schema({
    name: { type: String, required: true }
});

module.exports = mongoose.model('competition', CompetitionSchema);