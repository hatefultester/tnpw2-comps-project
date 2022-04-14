const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { postman } = require('./../utils/helper');
const User = require("../model/userModel");


const ACCESS_TOKEN_KEY = 'tnpw2projekt';

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

    const sameUsername = await User.findOne({ username });

    if (sameUsername) {
        return res.status(409).send("Username is already used, please choose different username");
    }

    try {
        encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username: username.toLowerCase(),
            password: encryptedPassword,
        });

        const token = createAccessToken(user);

        res.cookie("token", token, {
            httpOnly: true,
        });

        res.status(201).json(user);

    } catch (err) {
        console.log(err);
    }

};

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

// TODO
const getSingleUser = async(req, res) => {

};

const updateUser = async(req, res) => {

};

const logoutUser = async(req, res) => {
    res.cookie('token').clearCookie;
    res.status(200).send("OK");
};

const getAllUsers = async(req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(comps);
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

module.exports = {
    createNewUser,
    loginUser,
    logoutUser,
    getSingleUser,
    updateUser,
    getAllUsers,
    deleteAllUsers,
}