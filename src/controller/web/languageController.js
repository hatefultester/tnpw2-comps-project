// switch language cookie. Hardcoded, no support for adding additional language
const changeLanguage = async(req, res) => {
    const { lang } = req.cookies;

    if (!lang)
        res.cookie('lang', 'en', { httpOnly: true });

    if (lang === 'cs') {
        res.cookie('lang', 'en', { httpOnly: true });
    } else if (lang === 'en') {
        res.cookie('lang', 'cs', { httpOnly: true });
    }

    res.status(200).send("OK");
}

module.exports = { changeLanguage };