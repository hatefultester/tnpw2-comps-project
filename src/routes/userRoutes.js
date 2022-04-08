const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../model/userModel");
const ACCESS_TOKEN_KEY = 'tnpw2projekt';

router.post('/create', async(req, res) => {

    // get user inputs
    const { username, password, repeatPassword } = req.body;

    // validate user inputs
    if (!(username && password && repeatPassword)) return res.status(400).send({ error: "All inputs are required" });
    if (password != repeatPassword) return res.status(400).send({ error: "Passwords not match" });
    if (password.length < 8) return res.status(400).send({ error: "Password must be 8 or more characters" });

    // try to find user with same email in database
    const sameUsername = await User.findOne({ username });

    // check if email exists in a database
    if (sameUsername) {
        return res.status(409).send("Username is already used");
    }

    // bcrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // create a new user
    const user = await User.create({
        username: username.toLowerCase(),
        password: encryptedPassword,
    });

    // create a user token
    const token = createAccessToken(user);

    res.cookie("token", token, {
        httpOnly: true,
    });
    res.status(201).json(user);
});

router.post('/login', async(req, res) => {
    try {
        const { username, password } = req.body;

        // validate user input
        if (!(username && password)) {
            res.status(400).send("All inputs are required");
        }

        // validate existence of user by email
        const user = await User.findOne({ username });

        // compare user password with response password
        if (user && (await bcrypt.compare(password, user.password))) {

            const token = createAccessToken(user);

            res.cookie("token", token, {
                httpOnly: true,
            });

            res.status(200).json(user);
        }

        // return invalid credentials error
        res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }
});

router.get('/logout', async(req, res) => {
    res.cookie('token').clearCookie;
    res.status(200).send("OK");
});

function createAccessToken(user) {
    return jwt.sign({ user },
        ACCESS_TOKEN_KEY, { expiresIn: "1h" }
    );
}


router.get('/getAll', async(req, res) => {
    const comps = await User.find({});
    res.status(200).json(comps);
})

router.delete('/deleteAll', async(req, res) => {
    const comps = await User.deleteMany({});
    res.status(200).json(comps);
});

module.exports = router;