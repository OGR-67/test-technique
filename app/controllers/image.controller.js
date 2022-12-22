const jimp = require("jimp");
const db = require("../models");
const { checkId, isTokenValid } = require("./helper.js");
const Image = db.images;
const Op = db.Sequelize.Op;
const { extname } = require("path");


// Create and Save a new Image
exports.create = async (req, res) => {
    try {
        // Check token validity 
        if (!await isTokenValid(req, res)) { return; }

        // Validate request
        if (!req.body.description) {
            res.status(400).json({
                message: "Description cannot be empty!"
            });
            return;
        }

        // Convert image to base64
        const imagePath = req.body.imagePath;
        const jimpImage = await jimp.read(imagePath);
        const mimeForImage = jimpImage._originalMime;
        const buffer = await jimpImage.getBufferAsync(mimeForImage);
        const imageExtension = extname(imagePath);

        // Create an Image
        const image = {
            imageData: buffer,
            imageMime: mimeForImage,
            imageExt: imageExtension,
            description: req.body.description,
        };

        // Save Image in the database
        // INSERT INTO image (imageData, imageMime, imageExt, description)
        // VALUES (buffer, mimeForImage, imageExtension, description)
        data = await Image.create(image);
        res.status(200).json(data);
    }
    catch (err) {
        res.status(500).json({
            message:
                err.message || "Some error occurred while creating the Image."
        });
    };
};

// Retrieve Images from the database.
exports.findAll = async (req, res) => {
    // Check token validity 
    if (!await isTokenValid(req, res)) { return; }

    const description = req.query.description;
    let condition = description ? { description: { [Op.iLike]: `%${description}%` } } : null;

    try {
        // SELECT * FROM image WHERE description ILIKE "%description%"
        data = await Image.findAll({ where: condition });
        res.status(200).json(data);
    }
    catch (err) {
        res.status(500).json({
            message:
                err.message || "Some error occurred while retrieving Images."
        });
    };
};

// Find a single Image
exports.findOne = async (req, res) => {
    // Check token validity 
    if (!await isTokenValid(req, res)) { return; }

    // Check if id is an integer
    if (!checkId(req, res)) { return; }

    const id = req.params.id;
    try {
        // SELECT * FROM image WHERE id=id
        const data = await Image.findByPk(id);

        if (data) { res.status(200).json(data); }
        else {
            res.status(404).json({
                message: `Cannot find Image with id=${id}.`
            });
        }
    }
    catch (err) {
        res.status(500).json({
            message: "Error retrieving Image with id=" + id
        });
    };
};

// Update the Image description, filtered by the id
exports.update = async (req, res) => {
    // Check token validity 
    if (!await isTokenValid(req, res)) { return; }

    // Check if id is an integer
    if (!checkId(req, res)) { return; }

    const id = req.params.id;

    try {
        // UPDATE image set description = req.body.description WHERE id=id
        const imageIsUpdated = await Image.update(req.body, {
            where: { id: id }
        });

        if (imageIsUpdated == true) {
            res.status(200).json({
                message: "Image was updated successfully."
            });
        } else {
            res.status(400).json({
                message: `Cannot update Image with id=${id}. Maybe Image was not found or description is not present in HTTP boby.`
            });
        }
    }
    catch (err) {
        res.status(500).json({
            message: "Error updating Image with id=" + id
        });
    };
};

// Delete an Image with the specified id in the request
exports.delete = async (req, res) => {
    // Check token validity 
    if (!await isTokenValid(req, res)) { return; }

    // Check if id is an integer
    if (!checkId(req, res)) { return; }

    const id = req.params.id;
    try {
        // DELETE FROM image where id=id
        const imageIsDeleted = await Image.destroy({ where: { id: id } });

        if (imageIsDeleted == true) {
            res.status(200).json({
                message: "Image was deleted successfully!"
            });
        } else {
            res.status(400).json({
                message: `Cannot delete Image with id=${id}. Maybe Image was not found!`
            });
        }
    }
    catch (err) {
        res.status(500).json({
            message: "Could not delete Image with id=" + id
        });
    };
};

// Delete all Image from the database.
exports.deleteAll = async (req, res) => {
    // Check token validity 
    if (!await isTokenValid(req, res)) { return; }

    try {
        // ~ TRUNCATE TABLE image
        const numberOfDeletedImages = await Image.destroy({
            where: {},
            truncate: false
        });

        res.status(200).json({ message: `${numberOfDeletedImages} Images were deleted successfully!` });
    }
    catch (err) {
        res.status(500).json({
            message:
                err.message || "Some error occurred while removing all Image."
        });
    };
};

// Convert Image data to img html tag with data-URI src
exports.convertOne = async (req, res) => {
    // Check token validity 
    if (!await isTokenValid(req, res)) { return; }

    // Check if id is an integer
    if (!checkId(req, res)) { return; }

    const id = req.params.id;

    try {
        // SELECT * FROM image WHERE id=id
        const data = await Image.findByPk(id);
        const base64 = Buffer.from(data.imageData).toString("base64");

        const src = `data:${data.imageMime};base64,${base64}`;

        res.status(200).send(`<img src="${src}" alt="${data.description}">`);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
};