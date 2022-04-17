const express = require("express");
const router = express.Router();
const { auth } = require("../../middleware/jwtAuth");

const {
    createCompetition,
    getAllCompetitions,
    getCompetition,
    updateCompetition,
    deleteCompetition,
    deleteAll
} = require('./../../controller/comp/competitionController');

// create competition
router.post('/create', auth, createCompetition);

// get competition by id
router.get('/get/:id', getCompetition);

// delete competition
router.delete('/delete', auth, deleteCompetition);

// get All competitions
router.get('/getAll', getAllCompetitions);

// delete All competitions
router.delete('/deleteAll', auth, deleteAll);

// update
router.patch('/update/:id', auth, updateCompetition);


module.exports = router;