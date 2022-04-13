const express = require("express");
const router = express.Router();

const { auth } = require("./../middleware/jwtAuth");

const {
    dashboardPage,
    loginPage,
    expiredLoginPage,
    requiredLoginPage,
    registrationPage,
    createCompetitionPage,
    errorPage
} = require('./../controller/web/webController');


router.get('/', dashboardPage);

router.get('/login', loginPage);
router.get('/login_expired', expiredLoginPage);
router.get('/login_required', requiredLoginPage);
router.get('/registration', registrationPage);
router.get('/comp/create', auth, createCompetitionPage);
router.get('*', errorPage);


module.exports = router;