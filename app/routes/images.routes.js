module.exports = async (app) => {
    const images = require("../controllers/image.controller.js");

    const router = require("express").Router();

    // Create a new Image
    router.post("/", images.create);

    // Convert base64 data to img tag with data URI
    router.get("/convert/:id", images.convertOne);

    // // Retrieve all Images
    router.get("/", images.findAll);

    // // Retrieve a single Image with id
    router.get("/:id", images.findOne);

    // // Update an Image with id
    router.put("/:id", images.update);

    // // Delete an Image with id
    router.delete("/:id", images.delete);

    // // Delete all Images
    router.delete("/", images.deleteAll);


    app.use("/api/images", router);
};