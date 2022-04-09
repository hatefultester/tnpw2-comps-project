const express = require("express");
const router = express.Router();

const competition = require("../model/comps/competitionModel");
const competitor = require("../model/comps/competitorModel");
const event = require("../model/comps/eventModel");
const result = require("../model/comps/resultModel");
const { auth } = require("../middleware/jwtAuth");


router.post('/create', auth, async(req, res) => {
    try {
        const { name, date, events, description } = req.body;

        if (!(name && date && description)) return res.status(400).send("Name, Date and description are required !");

        const newCompetition = await competition.create({
            name: name,
            date: date,
            events: events,
            competitors: null,
            description: description
        });

        res.status(200).json(newCompetition);

    } catch (err) {
        console.log(err);
    }
});

router.get('/getCompetition', async(req, res) => {
    const { id } = req.body;
    const comp = await competition.findById(id);
    if (comp) res.status(200).json(comp)
    else res.status(400).send("Not found");
});


router.get('/getAllCompetitons', async(req, res) => {
    const comps = await competition.find({});
    res.status(200).json(comps);
})

router.delete('/deleteAllCompetitons', auth, async(req, res) => {
    const comps = await competition.deleteMany({});
    res.status(200).json(comps);
});

router.delete('/deleteCompetition', async(req, res) => {
    const { id } = req.body;
    const comp = await competition.findById(id);
    if (comp) {
        competition.findByIdAndDelete(id);
        res.status(200).send("Deleted");
    } else res.status(400).send("Not found");
});


module.exports = router;