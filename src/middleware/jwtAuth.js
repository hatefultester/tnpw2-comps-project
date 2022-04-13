const jwt = require("jsonwebtoken");
const { postman } = require("./../utils/helper");
const ACCESS_TOKEN_KEY = 'tnpw2projekt';

const auth = async(req, res, next) => {

    const { token } = req.cookies;
    const originUrl = req.url;
    const isPostman = await postman(req, res);

    if (!token) {
        if (isPostman) {
            console.log(postman);
            return res.status(403).send("A token is required for authentication");
        } else return res.redirect(`/login_required#${originUrl}`)
    }

    try {
        const decoded = jwt.verify(token, ACCESS_TOKEN_KEY);
        req.user = decoded;
    } catch (err) {
        if (isPostman) {
            return res.status(401).send("Invalid Token, please refresh your token");
        } else return res.redirect(`/login_expired#${originUrl}`)
    }

    return next();
};

const validToken = (req) => {
    const { token } = req.cookies;
    try {
        const decoded = jwt.verify(token, ACCESS_TOKEN_KEY);
        if (!decoded) { return false } else { return true }
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    auth,
    validToken
};