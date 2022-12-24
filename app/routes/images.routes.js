const router = require("express").Router();
const images = require("../controllers/image.controller.js");

// middlewares
const {
    checkId,
    isTokenValid,
    validateImageRequest
} = require("../controllers/middlewares.js");

module.exports = async (app) => {


    // Create a new Image
    router.post("/",
        isTokenValid,
        validateImageRequest,
        images.create
    );

    // Convert buffer data to img html tag with data URI
    router.get("/convert/:id",
        isTokenValid,
        checkId,
        images.convertOne
    ); // Should stay above findOne to prevent URL conflicts

    // Retrieve all Images
    router.get("/",
        isTokenValid,
        images.findAll
    );

    // Retrieve a single Image with id
    router.get("/:id",
        isTokenValid,
        checkId,
        images.findOne
    );

    // Update an Image with id
    router.put("/:id",
        isTokenValid,
        validateImageRequest,
        checkId,
        images.update
    );

    // Delete an Image with id
    router.delete("/:id",
        isTokenValid,
        checkId,
        images.delete
    );

    // Delete all Images
    router.delete("/",
        isTokenValid,
        images.deleteAll
    );


    app.use("/api/images", router);
};