require("dotenv").config();
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.users;

// Check if id is an integer
exports.checkId = (req, res) => {

    if (!parseInt(req.params.id)) {
        res.status(400).json({
            message: "id must be an integer. Check documentation."
        });
        return false;
    }
    return true;
};

// Check if given token is valid
exports.isTokenValid = async (req, res) => {

    let bearerHeader = req.headers.authorization;

    if (!bearerHeader) {
        res.status(400).json({
            message: "Can't find token. Check your headers"
        });
        return;
    }

    const token = bearerHeader.split(" ")[1];

    const isTokenValid = jwt.verify(token, process.env.TOKEN_KEY, (err, authData) => {
        if (!authData) { return false; }
        return true;
    });

    if (!isTokenValid) {
        res.status(401).json(
            { message: "Invalid token, please register to get full access" }
        );
    }
    return isTokenValid;
};