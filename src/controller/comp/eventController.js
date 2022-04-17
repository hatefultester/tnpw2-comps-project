const competition = require('./../../model/comp/competitionModel');
const round = require('./../../model/comp/roundModel');

const createEvent = async(req, res) => {
    const {
        name
    } = req.body;

    if (!name) res.status(400).send("Name must be provided");

}

const addRound = async(req, res) => {

}

const removeRound = async(req, res) => {

}

const updateRound = async(req, res) => {

}

const deleteEvent = async(req, res) => {

}

const getEvent = async(req, res) => {

}

const getAll = async(req, res) => {

}

const deleteAll = async(req, res) => {

}


module.exports = {
    createEvent,
    addRound,
    removeRound,
    updateRound,
    deleteEvent,
    getEvent,
    getAll,
    deleteAll
}