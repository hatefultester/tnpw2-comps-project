const helper = require('../../utils/helper');
const competitionController = require("../comp/competitionController");
const { getUser } = require("../../middleware/jwtAuth");
const { RESET_CONTENT } = require('http-status-codes');

/* DASHBOARD */

const dashboardPage = async(req, res) => {
    const comps = await competitionController.getListOfCompetitions();
    res.render('main', {
        str: helper.getStrings(req, res),
        comp: comps,
        user: getUser(req),
        dashboardPage: true
    });
};

const createCompetitionPage = async(req, res) => {
    res.render('layouts/comp/create', {
        str: helper.getStrings(req, res)
    });
};


/* USER */

const userDetailPage = async(req, res) => {
    const user = getUser(req);
    if (!user) res.redirect("/login");
    res.render('layouts/detail/userDetail', {
        str: helper.getStrings(req, res),
        user: user,
        userDetailPage: true
    });
};


/* LOGIN */

const loginPage = async(req, res) => {
    if (getUser(req)) res.redirect("/");
    res.render('layouts/auth/login', {
        str: helper.getStrings(req, res)
    });
};

const expiredLoginPage = async(req, res) => {
    if (getUser(req)) res.redirect("/");
    res.render('layouts/auth/login', {
        str: helper.getStrings(req, res),
        expired: true,
    });
};

const requiredLoginPage = async(req, res) => {
    if (validToken(req)[0]) res.redirect("/");
    res.render('layouts/auth/login', {
        str: helper.getStrings(req, res),
        required: true,
    });
}

/* REGISTRATION */

const registrationPage = async(req, res) => {
    res.render('layouts/auth/registration', {
        str: helper.getStrings(req, res)
    });
}

/* ERROR PAGE */

const errorPage = async(req, res) => {
    res.render('layouts/error/page_not_found', {
        str: helper.getStrings(req, res)
    });
};



module.exports = {
    dashboardPage,
    userDetailPage,
    loginPage,
    expiredLoginPage,
    requiredLoginPage,
    registrationPage,
    createCompetitionPage,
    errorPage
};