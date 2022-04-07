const express = require("express");
const router = express.Router();

const getStrings = (req) => {
    const { lang } = req.cookies;

    // check if lang was selected if not => select en as default lang 
    if (!lang); // TODO

    let strings = require('./../assets/lang/cs.json');
    return strings;
}


router.get('/', (req, res) => {
    res.render('main', { str: getStrings(req) });
});

router.get('/login', (req, res) => {
    res.render('auth/login', { str: getStrings(req) });
});

router.get('/registration', (req, res) => {
    res.render('auth/registration', { str: getStrings(req) });
});

router.get('*', (req, res) => {
    res.render('error/page_not_found', { str: getStrings(req) });
});

module.exports = router;