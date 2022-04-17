const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./../model/userModel");
const { getUser } = require("./../middleware/jwtAuth");


const ACCESS_TOKEN_KEY = 'tnpw2projekt';

/**
 * 
 * @param {username, password, repeatPassword} req 
 * @param {*} res 
 * @returns Creates new user if inputs are valid. Validations are here, not on a frontend or database
 */
const createNewUser = async(req, res) => {

    const {
        username,
        password,
        repeatPassword
    } = req.body;

    if (!(username && password && repeatPassword)) {
        return res.status(400).send({ error: "All inputs are required" });
    }

    if (password != repeatPassword) {
        return res.status(400).send({ error: "Passwords not match" });
    }

    if (password.length < 8) {
        return res.status(400).send({ error: "Password must be 8 or more characters" });
    }

    // search if there is existing user
    const sameUsername = await User.findOne({ username });
    if (sameUsername) {
        return res.status(409).send("Username is already used, please choose different username");
    }

    // creating new user
    try {
        // password hash
        encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username: username.toLowerCase(),
            password: encryptedPassword,
        });

        const token = createAccessToken(user);

        // saving token to cookies
        res.cookie("token", token, {
            httpOnly: true,
        });

        res.status(201).json(user);

    } catch (err) {
        console.log(err);
    }

};

/**
 * 
 * @param {username, password} req 
 * @param {*} res 
 *
 */
const loginUser = async(req, res) => {

    const {
        username,
        password
    } = req.body;

    // validate user inputs
    if (!(username && password)) {
        res.status(400).send("All inputs are required");
    }

    try {
        // validate existence of user by email
        const user = await User.findOne({ username });

        // compare user password with response password
        if (user && (await bcrypt.compare(password, user.password))) {

            const token = createAccessToken(user);

            res.cookie("token", token, {
                httpOnly: true,
            });

            res.status(200).json(user);

        } else {
            // return invalid credentials error
            res.status(400).send("Invalid Credentials");
        }

    } catch (err) {
        console.log(err);
    }
};

/**
 * 
 * @param {used id} req 
 * @param {user in json format} res 
 */
const getSingleUser = async(req, res) => {
    const user = await User.findOne({ _id: req.params.id }).select('-password');
    if (!user) {
        res.status(400).send("user not found in the database");
    }
    res.status(200).json({ user });
};

/**
 * 
 * @param {username} req 
 * @param {returns user in json and new access token} res 
 */
const updateUser = async(req, res) => {
    const { username } = req.body;
    if (!username) {
        res.status(400).send('provide new username');
    }
    try {
        const user = await User.findOne({ _id: getUser(req)._id });

        user.username = username;
        await user.save();

        const token = createAccessToken(user);

        res.cookie("token", token, {
            httpOnly: true,
        });

        res.status(200).json({ user });
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
};

/**
 * 
 * @param {old password, new password, repeat new password} req 
 * @param {*} res 
 */
const updateUserPassword = async(req, res) => {
    const { oldPassword, newPassword, repeatNewPassword } = req.body;

    if (!oldPassword || !newPassword || !repeatNewPassword) {
        res.status(400).send("All field are required")
    }

    if (oldPassword === newPassword) {
        return res.status(400).send({ error: "New password must be different then old password" });
    }

    if (newPassword != repeatNewPassword) {
        return res.status(400).send({ error: "Passwords not match" });
    }

    if (newPassword.length < 8) {
        return res.status(400).send({ error: "Password must be 8 or more characters" });
    }

    try {
        const user = await User.findOne({ _id: getUser(req)._id });

        const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordCorrect) {
            res.status(400).send("Old password is not correct");
        }

        const encryptedPassword = await encryptPassword(newPassword);


        user.password = encryptedPassword;
        await user.save();

        const token = createAccessToken(user);

        res.cookie("token", token, {
            httpOnly: true,
        });

        console.log(user);
        res.status(200).send("Password succesfully updated");
    } catch (err) {
        console.log(err);
    }

};



const logoutUser = async(req, res) => {
    res.cookie('token').clearCookie;
    res.status(200).send("OK");
};

const getAllUsers = async(req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (err) {
        console.log(err);
    }
};

const deleteAllUsers = async(req, res) => {
    try {
        const comps = await User.deleteMany({});
        res.status(200).json(comps);
    } catch (err) {
        console.log(err);
    }
};


function createAccessToken(user) {
    return jwt.sign({ user },
        ACCESS_TOKEN_KEY, { expiresIn: "1h" }
    );
}

async function encryptPassword(password) {
    encryptedPassword = await bcrypt.hash(password, 10);
    return encryptedPassword;
}

module.exports = {
    createNewUser,
    loginUser,
    logoutUser,
    getSingleUser,
    updateUser,
    updateUserPassword,
    getAllUsers,
    deleteAllUsers,
}