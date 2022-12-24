module.exports = (sequelize, Sequelize) => {

    const Image = sequelize.define("image", {
        imageData: {
            type: Sequelize.BLOB("long"),
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