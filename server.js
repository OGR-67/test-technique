const express = require("express");
const app = express();

// parse requests of content-type - application/json
app.use(express.json());

// Database Init
const db = require("./app/models");

db.sequelize.sync({ force: true }) // !!! delete force: true for production !!!
    .then(() => {
        console.log("Synce db.");
    })
    .catch((err) => {
        console.error("Failed to sync db: " + err.message);
    });

// routes
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Image API, check documentation at https://github.com/OGR-67/test-technique/blob/main/README.md"
    });
});

require("./app/routes/images.routes")(app);
require("./app/routes/users.routes")(app);

app.use((req, res) => {
    res.status(404).json({
        error: "Endpoint not found",
        message: "Please refer to documentation"
    });
    return;
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
