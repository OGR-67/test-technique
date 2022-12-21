module.exports = (sequelize, Sequelize) => {
    const Image = sequelize.define("image", {
        imageData: {
            type: Sequelize.BLOB("long"),
            allowNull: true
        },
        imageMime: {
            type: Sequelize.STRING
        },
        imageType: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        }
    });

    return Image;
};