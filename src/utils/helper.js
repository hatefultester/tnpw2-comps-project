const userAgent = require('express-useragent');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns returns strings in JSON format based on parameter in cookies
 */

const getStrings = (req, res) => {

    const { lang } = req.cookies;

    // if empty, create default one
    if (!lang) {

        res.cookie("lang", "cs", {
            httpOnly: true,
        });

        var lng = "cs";

    } else {

        var lng = lang;

    }

    try {
        let strings = require(`./../assets/lang/${lng}.json`);
        return strings;
    } catch (err) {
        console.log(err);
        return null;
    }

}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns If browser agent includes ostman = if user is using postman for the request
 */

const postman = async(req, res) => {
    const browser = userAgent.getBrowser(req.headers['user-agent']);
    return browser.includes("ostman");
}

module.exports = { getStrings, postman };