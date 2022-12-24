const router = require("express").Router();
const users = require("../controllers/user.controller.js");

// Middlewares
const {
    validateEmailPattern,
    validatePassword,
    validateUserRequest,
    userAlreadyExists
} = require("../controllers/middlewares.js");

module.exports = (app) => {

    // Create a new User
    router.post("/register",
        validateUserRequest,
        validateEmailPattern,
        userAlreadyExists,
        validatePassword,
        users.create
    );

    // Collect A token for a registered user
    router.get("/login",
        validateUserRequest,
        validateEmailPattern,
        users.sendToken
    );


    app.use("/user", router);
};