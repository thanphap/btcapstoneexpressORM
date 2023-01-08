const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => { 
    return sequelize.define(
        'ImageSave',
        {
            userId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                field: "user_id",
            },
            imageId:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                field: "image_id",
            },
            createdSave:{
                type: DataTypes.DATE,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                field: "created_save",
            },
        },
        {
            tableName: "image_saves",
            timestamps: false,
        }
    );
 };