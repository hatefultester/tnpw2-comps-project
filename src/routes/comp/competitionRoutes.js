const express = require("express");
const router = express.Router();
const { auth } = require("../../middleware/jwtAuth");

const {
    createCompetition,
    getAllCompetitions,
    getCompetition,
    deleteCompetition,
    deleteAll
} = require('./../../controller/comp/competitionController');

router.post('/create', auth, createCompetition);
router.get('/get', getCompetition);
router.delete('/delete', deleteCompetition);
router.get('/getAll', getAllCompetitions);
router.delete('/deleteAll', auth, deleteAll);


module.exports = router;