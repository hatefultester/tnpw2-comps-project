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
    userDetailPage,
    errorPage
} = require('./../controller/web/webController');

// seznam soutezi
router.get('/', dashboardPage);

// login
router.get('/login', loginPage);
router.get('/login_expired', expiredLoginPage);
router.get('/login_required', requiredLoginPage);

// registrace
router.get('/registration', registrationPage);

// user detail
router.get('/user', userDetailPage)

// comp create
router.get('/comp/create', auth, createCompetitionPage);

// error page
router.get('*', errorPage);

module.exports = router;