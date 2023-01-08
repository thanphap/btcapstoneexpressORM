const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define(
        "Image",
        {
            imageId:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                field: "image_id",
            },
            imageName:{
                type: DataTypes.STRING,
                allowNull: false,
                field: "image_name",
            },
            imageUrl:{
                type: DataTypes.STRING,
                allowNull: false,
                field: "image_url",
            },
            descrition:{
                type: DataTypes.STRING,
            },
            userId:{
                type:DataTypes.INTEGER,
                allowNull:false,
                field:"user_id",
            }
        },
        {
            tableName: "images",
            timestamps: false,
        }

    );
};