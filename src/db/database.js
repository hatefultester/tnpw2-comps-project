const mongoose = require("mongoose");
// static database URL
const url = "mongodb://localhost:27017/TNPW2-Projekt";

/**
 * Database init
 */
exports.connect = () => {
    // Connecting to the database
    mongoose
        .connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then((_) => console.log("Connected to database"))
        .catch((err) => console.error("Connection to database failed", err));
};