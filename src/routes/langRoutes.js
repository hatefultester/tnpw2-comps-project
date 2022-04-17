const express = require("express");
const router = express.Router();

const {
    changeLanguage
} = require("./../controller/web/languageController");

// changes language
router.get('/change', changeLanguage);

module.exports = router;