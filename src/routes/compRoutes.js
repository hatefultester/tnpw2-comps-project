const express = require("express");
const router = express.Router();
const competition = require("../model/competitionModel");


router.post('/create', async(req, res) => {
    try {
        const { name } = req.body;

        const newCompetition = await competition.create({
            name: name,
        });

        res.status(200).json(newCompetition);

    } catch (err) {
        console.log(err);
    }
});


router.get('/getAll', async(req, res) => {
    const comps = await competition.find({});
    res.status(200).json(comps);
})

router.delete('/deleteAll', async(req, res) => {
    const comps = await competition.deleteMany({});
    res.status(200).json(comps);
});

module.exports = router;