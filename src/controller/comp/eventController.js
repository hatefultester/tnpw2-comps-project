const competition = require('./../../model/comp/competitionModel');
const round = require('./../../model/comp/roundModel');
const event = require('./../../model/comp/eventModel');

const createEvent = async(req, res) => {
    const {
        name
    } = req.body;

    const id = req.query.id;

    if (!name || !id) {
        res.status(400).send("ID of comp or Name is not provided")
    }

    try {
        const newEvent = await event.create({
            name: name,
            rounds: null
        });

        const comp = await competition.findById(id);

        if (comp.events === null) {
            comp.events = [newEvent];
        } else {
            comp.events = [...comp.events, newEvent];
        }
        await comp.save();

        res.status(200).send("Edited")

    } catch (err) {
        console.log(err);
    }

    if (!name) res.status(400).send("Name must be provided");

}


// NEEDS TO BE DONE :(
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