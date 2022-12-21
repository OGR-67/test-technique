require("dotenv").config();
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const { checkId, isTokenValid } = require("./helper.js")

// Create and Save a new User
exports.create = async (req, res) => {
    try {
        // Validate request
        if (!req.body.email || !req.body.password) {
            res.status(400).json({
                message: "email and password cannot be empty!"
            });

            return;
        }

        // Validate email pattern
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email)) {
            res.status(400).json({
                message: "invalid email adress"
            })
            return;
        }

        // Check if user already exist
        if (await userExists(req.body.email)) {
            res.status(409).json({
                message: `User ${req.body.email} already exist`
            })
            return;
        }

        // Encrypt password
        const encryptedPassword = await bcrypt.hash(
            req.body.password,
            parseInt(process.env.SALT)
        );

        // Generate a token
        const token = jwt.sign(
            { user_id: req.body.email },
            process.env.TOKEN_KEY
        )

        // Create an User
        const user = {
            email: req.body.email,
            password: encryptedPassword,
            token: token
        };

        // Save User in the database
        // INSERT INTO user (email, password, token)
        // VALUES (user.email, user.password, user.token)
        const data = await User.create(user)
        res.json({
            id: data.id,
            token: data.token
        });
        console.log("User succesfully sent to database");
    }
    catch (err) {
        res.status(500).json({
            message:
                err.message || "Some error occurred while creating the User."
        });
    };
};

// Delete a user
exports.delete = async (req, res) => {
    // Check token validity 
    if (!await isTokenValid(req, res)) { return; }

    // Check if id is an integer
    if (!checkId(req, res)) { return; }

    const id = req.params.id;
    try {
        // DELETE FROM user where id=id
        const userIsDeleted = await User.destroy({ where: { id: id } })

        if (userIsDeleted == true) {
            res.status(200).json({
                message: "User was deleted successfully!"
            });
        } else {
            res.status(400).json({
                message: `Cannot delete User with id=${id}. Maybe User was not found!`
            });
        }
    }
    catch (err) {
        res.status(500).json({
            message: "Could not delete User with id=" + id
        });
    };
};

// Send token if user is registered
exports.sendToken = async (req, res) => {
    try {
        // Validate request
        if (!req.body.email || !req.body.password) {
            res.status(400).json({
                message: "email and password cannot be empty!"
            });
            return;
        }

        // Validate email pattern
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email)) {
            res.status(400).json({
                message: "invalid email adress"
            })
            return;
        }

        let user = req.body.email

        // retrieve user
        // SELECT * FROM user where email=user
        const data = await User.findOne({ where: { email: user } })

        // Check if user exist and skip if not
        if (data == null) {
            res.status(400).json({ message: `User ${user} doesn't exist in our database` })
            return;
        }

        // decrypt password and skip if invalid
        if (!await bcrypt.compare(req.body.password, data.password)) {
            res.status(401).json({
                message: "invalid password"
            })
            return;
        }
        res.json({ token: data.token });

    }
    catch (err) {
        res.status(500).json({
            message: err.message || "Some error occured while retrieving Users"
        })
    }
}

// Helper function to check if user already exists
userExists = async (email) => {
    // SELECT * FROM user WHERE email=email
    const existingUser = await User.findOne({ where: { email: email } })
    if (existingUser === null) {
        return false;
    }
    return true
}