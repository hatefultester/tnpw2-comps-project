const express = require("express");
const router = express.Router();

const { auth, validToken } = require("../middleware/jwtAuth");

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
    if (validToken(req)) res.redirect("/");
    res.render('layouts/auth/login', { str: getStrings(req, res) });
});

router.get('/login_expired', (req, res) => {
    res.render('layouts/auth/login', {
        str: getStrings(req, res),
        expired: true,
    });
});

router.get('/login_required', (req, res) => {
    res.render('layouts/auth/login', {
        str: getStrings(req, res),
        required: true,
    });
});

router.get('/registration', (req, res) => {
    res.render('layouts/auth/registration', { str: getStrings(req, res) });
});

router.get('/comp/create', auth, (req, res) => {
    res.render('layouts/comp/create', { str: getStrings(req, res) });
});

router.get('*', (req, res) => {
    res.render('layouts/error/page_not_found', { str: getStrings(req, res) });
});


module.exports = router;