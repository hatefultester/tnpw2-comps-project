const express = require("express");
const router = express.Router();
const languageController = require("./../controller/web/languageController");

router.get('/change', languageController.changeLanguage);

module.exports = router;