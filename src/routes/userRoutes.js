const express = require("express");
const router = express.Router();
const { auth } = require("./../middleware/jwtAuth");


const {
    createNewUser,
    loginUser,
    logoutUser,
    getAllUsers,
    deleteAllUsers,
} = require('./../controller/userController');

router.post('/create', createNewUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/getAll', auth, getAllUsers);
router.get('/deleteAll', auth, deleteAllUsers);

module.exports = router;