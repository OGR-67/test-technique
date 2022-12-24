require("dotenv").config();
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.users;

// Check if id is an integer
exports.checkId = (req, res, next) => {

    if (!parseInt(req.params.id)) {
        res.status(400).json({
            message: "id must be an integer. Check documentation."
        });
        return;
    }
    next();
};

exports.isTokenValid = async (req, res, next) => {

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
        return;
    }
    next();
};

exports.validateEmailPattern = (req, res, next) => {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email)) {
        res.status(400).json({
            message: "invalid email adress"
        });
        return;
    }
    next();
};

exports.validatePassword = (req, res, next) => {
    if (req.body.password.length < 8) {
        res.status(400).json({
            message: "password must have at least 8 characters"
        });
        return;
    }
    next();
};

exports.userAlreadyExists = async (req, res, next) => {
    const existingUser = await User.findOne({ where: { email: req.body.email } });
    console.log(existingUser);
    if (existingUser !== null) {
        res.status(409).json({
            message: `User ${req.body.email} already exist`
        });
        return;
    }
    next();
};

exports.validateUserRequest = (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        res.status(400).json({
            message: "email and password cannot be empty!"
        });
        return;
    }
    next();
};

exports.validateImageRequest = (req, res, next) => {

    if (!req.body.description) {
        res.status(400).json({
            message: "Description cannot be empty!"
        });
        return;
    }
    next();
};