const userAgent = require('express-useragent');


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

const postman = (req, res) => {
    const browser = userAgent.getBrowser(req.headers['user-agent']);
    return browser.includes("ostman");
}

module.exports = { getStrings, postman };