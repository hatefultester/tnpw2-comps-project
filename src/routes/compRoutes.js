const express = require("express");
const router = express.Router();

const competition = require("../model/competitionModel");


router.post('/create', async(req, res) => {

});


router.get('/getAll', async(req, res) => {
    const comps = await competition.find({});
    res.status(200).json(comps);
})

module.exports = router;