module.exports = (sequelize, Sequelize) => {

    // CREATE TABLE IF NOT EXISTS image (
    //     id SERIAL PRIMARY KEY,
    //     imageData BYTEA NOT NULL,
    //     imageMime VARCHAR(25) NOT NULL,
    //     imageExt VARCHAR(5) NOT NULL, 
    //     description VARCHAR(255) NOT NULL,
    // )

    const Image = sequelize.define("image", {
        imageData: {
            type: Sequelize.BLOB("long"),
            allowNull: true
        },
        imageMime: {
            type: Sequelize.STRING(25)
        },
        imageExt: {
            type: Sequelize.STRING(5)
        },
        description: {
            type: Sequelize.STRING
        }
    });

    return Image;
};