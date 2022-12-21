module.exports = (app) => {
    const users = require("../controllers/user.controller.js");

    const router = require("express").Router();

    // Create a new User
    router.post("/register", users.create);

    // Delete a user
    router.delete("/delete/:id", users.delete);

    // Retrieve all Images
    router.get("/login", users.sendToken);

    app.use("/user", router);
};