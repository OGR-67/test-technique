const db = require("../models");
const User = db.users;

// Check if id is an integer
exports.checkId = (req, res) => {

    if (!parseInt(req.params.id)) {
        res.status(400).json({
            message: "id must be an integer. Check documentation."
        })
        return false;
    }
    return true
}

// Check if given token is valid
exports.isTokenValid = async (req, res) => {

    if (!req.headers.token) {
        res.status(400).json({
            message: "Can't find token. Check your headers"
        })
        return;
    }

    try {
        let token = req.headers.token

        data = await User.findOne({ where: { token: token } })

        if (!data) {
            res.status(401).json(
                { message: "Invalid token, please register to get full access" }
            );
            return false
        }
        return true;
    }
    catch (err) {
        res.status(500).json({
            message:
                err.message || "Some error occured while retrieving Users"
        })
    }
}