const express = require("express");
const router = express.Router();

const getStrings = (req, res) => {
    const { lang } = req.cookies;

    // check if lang was selected if not => select en as default lang 
    if (!lang) {
        res.cookie("lang", "cs", {
            httpOnly: true,
        });

        var lng = "cs";
    } else {
        var lng = lang;
    }

    let strings = require(`./../assets/lang/${lng}.json`);
    return strings;
}


router.get('/', (req, res) => {
    res.render('main', { str: getStrings(req, res) });
});

router.get('/login', (req, res) => {
    res.render('auth/login', { str: getStrings(req, res) });
});

router.get('/registration', (req, res) => {
    res.render('auth/registration', { str: getStrings(req, res) });
});

router.get('*', (req, res) => {
    res.render('error/page_not_found', { str: getStrings(req, res) });
});

module.exports = router;