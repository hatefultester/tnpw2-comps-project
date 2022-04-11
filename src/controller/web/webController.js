const helper = require('../../utils/helper');
const competitionController = require("../comp/competitionController");
const { validToken } = require("../../middleware/jwtAuth");

const dashboardPage = async(req, res) => {
    const comps = await competitionController.getListOfCompetitions();
    res.render('main', { str: helper.getStrings(req, res), comp: comps });
};

const loginPage = async(req, res) => {
    if (validToken(req)) res.redirect("/");
    res.render('layouts/auth/login', { str: helper.getStrings(req, res) });
};

const expiredLoginPage = async(req, res) => {
    res.render('layouts/auth/login', {
        str: helper.getStrings(req, res),
        expired: true,
    });
};

const requiredLoginPage = async(req, res) => {
    res.render('layouts/auth/login', {
        str: helper.getStrings(req, res),
        required: true,
    });
}

const registrationPage = async(req, res) => {
    res.render('layouts/auth/registration', { str: helper.getStrings(req, res) });
}

const createCompetitionPage = async(req, res) => {
    res.render('layouts/comp/create', { str: helper.getStrings(req, res) });
}

const errorPage = async(req, res) => {
    res.render('layouts/error/page_not_found', { str: helper.getStrings(req, res) });
}

module.exports = {
    dashboardPage,
    loginPage,
    expiredLoginPage,
    requiredLoginPage,
    registrationPage,
    createCompetitionPage,
    errorPage
};