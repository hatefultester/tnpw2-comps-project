const express = require("express");
const router = express.Router();
const competition = require("../../model/comp/competitionModel");
const { auth } = require("../../middleware/jwtAuth");

const {
    createEvent,
    addRound,
    removeRound,
    updateRound,
    deleteEvent,
    getEvent,
    getAll,
    deleteAll
} = require('./../../controller/comp/eventController');


router.patch('/addEvent', auth, createEvent);

router.patch('/createEvents', async(req, res) => {
    const { id, events } = req.body;

    if (!(id && events)) res.status(400).send("ID and Events are required");

    try {
        const comp = await competition.findById(id);

        comp.events = events;

        await comp.save()
    } catch (err) { console.log(err); }
});


module.exports = router;