const express = require("express");
const router = express.Router();
const { auth } = require("../../middleware/jwtAuth");

const {
    getAllCompetitors,
    deleteAllCompetitors,
    addNewCompetitor,
    deleteByCompetitionId,
    updateResults,
    deleteCompetitor,
    getCompetitorById
} = require('./../../controller/comp/competitorController');


router.post('/add', auth, addNewCompetitor);

router.get('/getAll', getAllCompetitors);

router.get('/get', getCompetitorById)

router.delete('/deleteAll', auth, deleteAllCompetitors);

router.delete('/deleteByCompetitionId', auth, deleteByCompetitionId);

router.delete('/delete', auth, deleteCompetitor);

router.patch('/update', updateResults);

module.exports = router;