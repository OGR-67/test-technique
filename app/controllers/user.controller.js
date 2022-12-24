require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../models");
const User = db.users;

// Create and Save a new User
exports.create = async (req, res) => {
    try {
        // Encrypt password
        const encryptedPassword = await bcrypt.hash(
            req.body.password,
            parseInt(process.env.SALT)
        );

        // Generate a token
        const token = jwt.sign(
            { user_id: req.body.email },
            process.env.TOKEN_KEY
        );

        // Create a User
        const user = {
            email: req.body.email,
            password: encryptedPassword,
            token: token
        };

        await User.create(user);
        res.json({
            token: token
        });
    }
    catch (err) {
        res.status(500).json({
            message:
                err.message || "Some error occurred while creating the User."
        });
    };
};

// Send token if user is registered
exports.sendToken = async (req, res) => {
    try {
        let user = req.body.email;

        // retrieve user
        const data = await User.findOne({ where: { email: user } });

        // Check if user exist and skip if not
        if (data == null) {
            res.status(400).json({ message: `User ${user} doesn't exist in our database` });
            return;
        }

        // decrypt password and skip if invalid
        if (!await bcrypt.compare(req.body.password, data.password)) {
            res.status(401).json({
                message: "invalid password"
            });
            return;
        }

        // Generate a token
        const token = jwt.sign(
            { user_id: req.body.email },
            process.env.TOKEN_KEY
        );

        res.json({ token: token });

    }
    catch (err) {
        res.status(500).json({
            message: err.message || "Some error occured while retrieving Users"
        });
    }
};
