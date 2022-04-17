const express = require("express");
const router = express.Router();
const { auth } = require("./../middleware/jwtAuth");


const {
    createNewUser,
    loginUser,
    logoutUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteAllUsers,
    updateUserPassword,
} = require('./../controller/userController');

// create user
router.post('/create', createNewUser);

// login user
router.post('/login', loginUser);

// logout user
router.get('/logout', logoutUser);

// get single user
router.get('/get/:id', getSingleUser);

// edit user
router.patch('/update', auth, updateUser);

router.patch('/updatePassword', auth, updateUserPassword)

// for testing : getAll, deleteAll
router.get('/getAll', auth, getAllUsers);
router.get('/deleteAll', auth, deleteAllUsers);

module.exports = router;