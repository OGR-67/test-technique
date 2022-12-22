module.exports = (sequelize, Sequelize) => {

    // CREATE TABLE IF NOT EXISTS user (
    //     id SERIAL PRIMARY KEY,
    //     email VARCHAR(255) NOT NULL,
    //     password VARCHAR(255) NOT NULL
    // )

    const User = sequelize.define("user", {
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        }
    })
    return User;
};