module.exports = (app) => {
    const users = require("../controllers/user.controller.js");

    const router = require("express").Router();

    // Create a new User
    router.post("/register", users.create);

    // Collect A token for a registered user
    router.get("/login", users.sendToken);

    app.use("/user", router);
};