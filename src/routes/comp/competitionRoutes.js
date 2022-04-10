/*

Get All, Create comp, Delete comp, Get detail

*/

const express = require("express");
const router = express.Router();
const competition = require("../../model/comp/competitionModel");
const { auth } = require("../../middleware/jwtAuth");


router.post('/create', auth, async(req, res) => {
    try {

        const { name, date, shortDescription, description } = req.body;

        if (!(name && date && description)) return res.status(400).send("Name, Date and Description are required !");

        const newCompetition = await competition.create({
            name: name,
            date: date,
            events: null,
            competitors: null,
            shortDescription: shortDescription,
            description: description,
        });

        res.status(200).json(newCompetition);

    } catch (err) {
        console.log(err);
    }
});

/*
// returns detail of competition in json
router.get('/:id', async(req, res) => {
    const { id } = req.params.id || req.body;
    const comp = await competition.findById(id);
    if (comp) res.status(200).json(comp)
    else res.status(400).send("Not found");
});


// delete comp by id
router.delete('/:id', async(req, res) => {
    const { id } = req.params.id || req.body;
    const comp = await competition.findById(id);
    if (comp) {
        competition.findByIdAndDelete(id);
        res.status(200).send("Deleted");
    } else res.status(400).send("Not found");
});
*/
// returns all competition with useful info for dashboard
router.get('/list', async(req, res) => {
    const comps = await competition.find({});
    try {
        const reduced = comps.map(reduceCompInfo);
        res.status(400).json(reduced);
    } catch (err) { console.log(err); }

});

// returns all competitions in json
router.get('/getAll', async(req, res) => {
    try {
        const comps = await competition.find({});
        res.status(200).json(comps);
    } catch (err) { console.log(err); }
});


function reduceCompInfo(comp) {
    return {
        "name": comp.name,
        "date": comp.date,
        "shortDescription": comp.shortDescription
    };
}


// deletes all competitions in json
router.delete('/deleteAll', auth, async(req, res) => {
    const comps = await competition.deleteMany({});
    res.status(200).json(comps);
});


module.exports = router;